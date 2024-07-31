import os
import sys
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.conf import settings
from .models import List
from .serializers import ListSerializer, ListCreationSerializer

# # Add the project root to sys.path
# project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# sys.path.append(project_root)

# # Set up Django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'htfbi_backend.settings')
# django.setup()

# from ai_agent.models import AgentRole

# def create_agent_role(name, description):
#     return AgentRole.objects.create(name=name, description=description)


class ListViewSet(ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer

    @action(detail=False, methods=['post'], url_path='add_list')
    def add_agent(self, request):
        serializer = ListCreationSerializer(data=request.data.get('list_info', {}))
        
        if serializer.is_valid():
            list_instance = serializer.save()
            response_serializer = ListSerializer(list_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class ListViewSet(ModelViewSet):
#     queryset = List.objects.all()
#     serializer_class = ListSerializer

    # @action(detail=False, methods=['post'], url_path='add_list')
    # def add_agent(self, request):
    #     list_info = request.data.get('list_info', {})
    #     name = list_info.get('name')
    #     description = list_info.get('description')
    #     agent_role_description = list_info.get('agent_role_description')
    #     owner = list_info.get('owner')

    #     if not name or not description or not agent_role_description or not owner: 
    #         return Response({"error": "All list_info are required"}, status=status.HTTP_400_BAD_REQUEST)

    #     # Create a new AgentRole instance
    #     try:
    #         new_agent = create_agent_role(name, agent_role_description)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #     data = {
    #         'name': name,
    #         'description': description,
    #         'agent_role': new_agent.id,
    #         'owner': owner, 
    #     }

    #     # Serialize the data
    #     serializer = ListSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)