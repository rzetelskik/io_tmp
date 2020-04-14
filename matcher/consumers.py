from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class MatcherConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        self.unique_group = 'user_%s' % self.user.username

        if self.user.is_anonymous:
            self.close()
        else:
            async_to_sync(self.channel_layer.group_add)(self.unique_group, self.channel_name)
            print(f"{self.user.username} added to group {self.unique_group}")

            self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.unique_group, self.channel_name)

    def test_message(self, event):
        self.send(f"Got {event['text']}")
