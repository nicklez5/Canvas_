from rest_framework import serializers
from message.serializers import SerializeMessage
from profiles.serializers import SerializeProfile
from .models import Thread
class SerializeThread(serializers.ModelSerializer):
    list_messages = SerializeMessage(read_only=True,many=True)
    class Meta:
        model = Thread
        fields = ['id', 'list_messages', 'last_author' , 'last_description', 'last_timestamp']
        depth = 1