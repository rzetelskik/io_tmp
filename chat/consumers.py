from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from matcher.models import Match
import json


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        id = self.scope["url_route"]["kwargs"]["id"]
        self.user = self.scope["user"]
        self.match = await database_sync_to_async(Match.objects.get(pk=id))()
        self.current_chat_group = "chat_{}".format(self.match.pk)
        self.commands = {
            'new_message': self.new_message,
            'fetch_messages': self.fetch_messages
        }

        if self.user.is_anonymous:
            await self.close()
        else:
            await self.channel_layer.group_add(self.current_chat_group, self.channel_name)
            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.current_chat_group, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        await self.commands[data['command']](self, data)

    @staticmethod
    def message_to_json(message):
        return {
            'author': message.author.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    @staticmethod
    def messages_to_json(messages):
        result = []
        for message in messages:
            result.append(ChatConsumer.message_to_json(message))
        return result

    # TODO na razie zwraca wszystkie w jakiejs losowej kolejnosci
    async def fetch_messages(self):
        messages = await database_sync_to_async(Message.objects.get(match=self.match))()
        content = {
            'command': 'messages',
            'messages': ChatConsumer.messages_to_json(messages)
        }

        await self.send(text_data=json.dumps(content))

    async def new_message(self, data):
        message = Message.objects.create(match=self.match, author=self.user, content=data['text'])
        content = {
            'command': 'new_message',
            'message': ChatConsumer.message_to_json(message)
        }
        await self.send_chat_message(content)

    async def send_chat_message(self, message):
        await self.channel_layer.group_send(self.current_chat_group, {
            'type': 'chat_message',
            'message': message
        })

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event['message']))
