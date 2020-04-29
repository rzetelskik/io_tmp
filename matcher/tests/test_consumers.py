import pytest
from channels.db import database_sync_to_async
from channels.testing import WebsocketCommunicator
from channels.layers import get_channel_layer
from matcher.consumers import MatcherConsumer
import factory
from account.models import CustomUser


@database_sync_to_async
class CustomUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = CustomUser

    username = factory.Faker('word')
    email = factory.Faker('email')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    password = factory.Faker('password')


@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
async def test_matcher_consumer_connect():
    user = await CustomUserFactory()

    communicator = WebsocketCommunicator(MatcherConsumer, "/ws/matcher/")
    communicator.scope["user"] = user
    connected, _ = await communicator.connect()
    assert connected
    await communicator.disconnect()


@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
async def test_matcher_consumer_created_notification():
    user = await CustomUserFactory()
    channel_layer = get_channel_layer()

    communicator = WebsocketCommunicator(MatcherConsumer, "/ws/matcher/")
    communicator.scope["user"] = user
    connected, _ = await communicator.connect()
    assert connected

    user_group = "user_{}".format(user.username)
    await channel_layer.group_send(user_group, {"type": "match.created.notification"})
    response = await communicator.receive_from()
    assert response == "User has a new match."

    await communicator.disconnect()


@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
async def test_matcher_consumer_deleted_notification():
    user = await CustomUserFactory()
    channel_layer = get_channel_layer()

    communicator = WebsocketCommunicator(MatcherConsumer, "/ws/matcher/")
    communicator.scope["user"] = user
    connected, _ = await communicator.connect()
    assert connected

    user_group = "user_{}".format(user.username)
    await channel_layer.group_send(user_group, {"type": "match.deleted.notification"})
    response = await communicator.receive_from()
    assert response == "User's current meeting has been terminated."

    await communicator.disconnect()
