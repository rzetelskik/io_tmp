import asyncio
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class PingPongConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        while 1:
            await asyncio.sleep(1)
            await self.send_json("PING")
            await asyncio.sleep(1)
            await self.send_json("PONG")