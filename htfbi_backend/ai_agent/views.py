from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.conf import settings
from .models import AgentRole, AgentResponse
from .serializers import AgentRoleSerializer, AgentResponseSerializer
from .llama3_agent import get_agent_response
import json

class AgentRoleViewSet(ModelViewSet):
    queryset = AgentRole.objects.all()
    serializer_class = AgentRoleSerializer

    @action(detail=False, methods=['post'], url_path='add_agent')
    def add_agent(self, request):
        agent_info = request.data.get('agent_info', {})
        name = agent_info.get('name')
        description = agent_info.get('description')

        if not name or not description:
            return Response({"error": "Both 'name' and 'description' are required"}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            'name': name,
            'description': description,
        }


        # Serialize the data
        serializer = AgentRoleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AgentResponseViewSet(ModelViewSet):
    queryset = AgentResponse.objects.all()
    serializer_class = AgentResponseSerializer

    @action(detail=False, methods=['post'], url_path='add_agent_response')
    def add_agent_response(self, request):
        note_request = request.data.get('note_request')
        transcript_id = note_request.get('transcript_id')
        agent_id = note_request.get('agent_id')

        if not transcript_id or agent_id:
            return Response({"error": "Both 'transcript_id' and 'agent_role' are required"}, status=status.HTTP_400_BAD_REQUEST)

        # use get_agent_response from our Llama3 agent file to get the ai response
        video, agent_response = get_agent_response(transcript_id, agent_id)


        data = {
            'video': video,
            'transcript': transcript_id,
            'agent_role': agent_id,
            'agent_response': agent_response,
        }


        # Serialize the data
        serializer = AgentResponseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
