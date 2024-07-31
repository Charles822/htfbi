from rest_framework import serializers
from .models import List


class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = List
        fields = ['id', 'name', 'description', 'agent_role', 'is_closed', 'owner', 'created_at']