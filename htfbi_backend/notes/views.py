from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.conf import settings
from .models import Note
from .serializers import NoteSerializer, NoteCreationSerializer
from core.permissions import AdminOnly

def get_permissions_based_on_action(action):
    # No permission required for retrieving a resource
    if action == 'retrieve':
        return [AllowAny]
        
    # For other actions, only allow the owner or an admin
    else:
        return [AdminOnly]

class NoteViewSet(ModelViewSet):
    serializer_class = NoteSerializer

    def get_permissions(self):
        return [permission() for permission in get_permissions_based_on_action(self.action)]

    def get_queryset(self):
        list_id = self.kwargs.get('list_pk')
        if list_id is not None:
            return Note.objects.filter(note_list=list_id)
        return Note.objects.all()

    @action(detail=False, methods=['post'], url_path='add_note')
    def add_note(self, request, *args, **kwargs):
        serializer = NoteCreationSerializer(data=request.data)
        
        if serializer.is_valid():
            note_instance = serializer.save()
            response_serializer = NoteSerializer(note_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
