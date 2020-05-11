from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from chat.models import Message
from matcher.models import Match
import json


def get_user_group_name(username):
    return "user_{}".format(username)


def get_chat_group_name(match_id):
    return "chat_{}".format(match_id)


def notify_user(username, type, match_id):
    notification = {'type': type, 'match_id': match_id}
    async_to_sync(get_channel_layer().group_send)(get_user_group_name(username), notification)


class Consumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        self.unique_group = get_user_group_name(self.user.username)
        self.commands = {
            'new_message': self.new_message,
            'fetch_messages': self.fetch_messages
        }

        if self.user.is_anonymous:
            await self.close()
        else:
            await self.channel_layer.group_add(self.unique_group, self.channel_name)
            await self.append_all_chat_groups()
            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.unique_group, self.channel_name)
        await self.discard_all_chat_groups()

    @database_sync_to_async
    def append_all_chat_groups(self):
        matches = Match.get_all_user_matches(self.user)
        for match in matches:
            self.channel_layer.group_add(get_chat_group_name(match.pk), self.channel_name)

    @database_sync_to_async
    def discard_all_chat_groups(self):
        matches = Match.get_all_user_matches(self.user)
        for match in matches:
            self.channel_layer.group_discard(get_chat_group_name(match.pk), self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        await self.commands[data['command']](data)

    @staticmethod
    def message_to_json(message):
        return {
            'match_id': message.match_id,
            'author': message.author.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    @staticmethod
    def messages_to_json(messages):
        result = []
        for message in messages:
            result.append(Consumer.message_to_json(message))
        return result

    @database_sync_to_async
    def fetch_messages(self, data):
        messages = Message.objects.filter(match_id=data['match_id']).order_by('-timestamp')
        content = {
            'command': 'messages',
            'messages': Consumer.messages_to_json(messages)
        }

        self.send(text_data=json.dumps(content))

    @database_sync_to_async
    def new_message(self, data):
        message = Message.objects.create(match_id=data['match_id'], author=self.user, content=data['text'])
        content = {
            'command': 'new_message',
            'message': Consumer.message_to_json(message)
        }

        self.channel_layer.group_send(get_chat_group_name(message.match_id), {
            'type': 'chat_message',
            'message': content
        })

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event['message']))

    async def match_created_notification(self, event):
        await self.channel_layer.group_add(get_chat_group_name(event['match_id']), self.channel_name)
        content = """{
            'command': 'match_created',
            'message': 'User has a new match.'
        }"""
        await self.send(text_data=content)

    async def match_deleted_notification(self, event):
        content = """{
            'command': 'match_terminated',
            'message': 'User's current meeting has been terminated.'
        }"""
        await self.send(text_data=content)
