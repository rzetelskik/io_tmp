from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class MatcherConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        self.unique_group = "user_{}".format(self.user.username)

        if self.user.is_anonymous:
            self.close()
        else:
            async_to_sync(self.channel_layer.group_add)(self.unique_group, self.channel_name)
            self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.unique_group, self.channel_name)

    def match_created_notification(self, event):
        self.send("User has a new match.")

    def match_deleted_notification(self, event):
        self.send("User's current meeting has been terminated.")
