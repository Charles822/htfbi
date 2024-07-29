from rest_framework import serializers
from .models import AgentRole, AgentResponse


class AgentRoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = AgentRole
        fields = ['id', 'name', 'description']


class AgentResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = AgentResponse
        fields = ['__all__']