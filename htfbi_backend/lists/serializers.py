from rest_framework import serializers
from .models import List
from ai_agent.models import AgentRole

class ListCreationSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    agent_role_description = serializers.CharField(required=True)
    owner = serializers.IntegerField(required=True)

    def create(self, validated_data):
        # Create the AgentRole instance
        agent_role = AgentRole.objects.create(
            name=validated_data['name'],
            description=validated_data['agent_role_description']
        )
        
        # Create the List instance
        list_instance = List.objects.create(
            name=validated_data['name'],
            description=validated_data['description'],
            agent_role=agent_role,
            owner_id=validated_data['owner']  # Assuming owner is a foreign key to a User model
        )
        
        return list_instance



class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = List
        fields = ['id', 'name', 'description', 'agent_role', 'is_closed', 'owner', 'created_at']