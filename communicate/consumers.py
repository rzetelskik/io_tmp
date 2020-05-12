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
    notification = {"type": type, "match_id": match_id}
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
            chat_groups = await self.get_all_user_groups()
            for chat_group in chat_groups:
                await self.channel_layer.group_add(chat_group, self.channel_name)
            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.unique_group, self.channel_name)
        chat_groups = await self.get_all_user_groups()
        for chat_group in chat_groups:
            await self.channel_layer.group_discard(chat_group, self.channel_name)

    @database_sync_to_async
    def get_all_user_groups(self):
        groups = []
        for match in Match.get_all_user_matches(self.user):
            groups.append(get_chat_group_name(match.pk))
        return groups

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        await self.commands[data['command']](data)

    def message_to_json(self, message):
        return {
            'match_id': message.match_id,
            'author': message.author.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    @database_sync_to_async
    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    @database_sync_to_async
    def get_messages(self, match_id):
        messages = Message.objects.filter(match_id=match_id).order_by('-timestamp')
        return messages

    async def fetch_messages(self, data):
        messages = await self.get_messages(data['match_id'])
        content = {
            'command': 'messages',
            'match_id': data['match_id'],
            'messages': await self.messages_to_json(messages)
        }

        await self.send(text_data=json.dumps(content))

    @database_sync_to_async
    def create_message(self, match_id, content):
        message = Message.objects.create(match_id=match_id, author=self.user, content=content)
        return message

    async def new_message(self, data):
        message = await self.create_message(match_id=data['match_id'], content=data['text'])
        content = {
            "command": "new_message",
            "message": self.message_to_json(message)
        }

        await get_channel_layer().group_send(get_chat_group_name(message.match_id),
                                             {"type": "chat.message.notification", "content": content})

    async def chat_message_notification(self, event):
        await self.send(text_data=json.dumps(event['content']))

    async def match_created_notification(self, event):
        await self.channel_layer.group_add(get_chat_group_name(event['match_id']), self.channel_name)

        await self.send(text_data='{"command": "match_created", "message": "User has a new match."}')

    async def match_deleted_notification(self, event):
        await self.send(
            text_data='{"command": "match_terminated", "message": "User\'s current meeting has been terminated."}')
