from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.conf import settings
from .models import Comment, Vote
from .serializers import CommentSerializer, CommentCreationSerializer, VoteSerializer, VoteCreationSerializer
from .permissions import IsOwnerOrAdmin


def get_permissions_based_on_action(action):
    # No permission required for retrieving a resource
    if action == 'retrieve':
        return [AllowAny]
    # Allow any authenticated user to create a resource
    elif action == 'create':
        return [IsAuthenticated]
    # For other actions, only allow the owner or an admin
    else:
        return [IsOwnerOrAdmin]


class CommentViewSet(ModelViewSet):
    serializer_class = CommentSerializer

    def get_permissions(self):
        return [permission() for permission in get_permissions_based_on_action(self.action)]

    def get_queryset(self):
        note_id = self.kwargs.get('note_pk')
        if note_id is not None:
            return Comment.objects.filter(note=note_id)
        return Comment.objects.all()

    @action(detail=False, methods=['post'], url_path='add_comment')
    def add_comment(self, request, *args, **kwargs):
        serializer = CommentCreationSerializer(data=request.data.get('comment_info', {}))
        
        if serializer.is_valid():
            comment_instance = serializer.save()
            response_serializer = CommentSerializer(comment_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VoteViewSet(ModelViewSet):
    serializer_class = VoteSerializer

    def get_queryset(self):
        note_id = self.kwargs.get('note_pk')
        if note_id is not None:
            return Vote.objects.filter(note=note_id)
        return Vote.objects.all()

    @action(detail=False, methods=['post'], url_path='add_vote')
    def add_vote(self, request, *args, **kwargs):
        serializer = VoteCreationSerializer(data=request.data.get('vote_info', {}))
        
        if serializer.is_valid():
            vote_instance = serializer.save()
            response_serializer = VoteSerializer(vote_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



