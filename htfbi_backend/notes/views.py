from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.conf import settings
from .models import Note
from .serializers import NoteSerializer, NoteCreationSerializer

class NoteViewSet(ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        list_id = self.kwargs.get('list_pk')
        if list_id is not None:
            return Note.objects.filter(note_list=list_id)
        return Note.objects.all()

    @action(detail=False, methods=['post'], url_path='add_note')
    def add_note(self, request, *args, **kwargs):
        serializer = NoteCreationSerializer(data=request.data.get('note_info', {}))
        
        if serializer.is_valid():
            note_instance = serializer.save()
            response_serializer = NoteSerializer(note_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
