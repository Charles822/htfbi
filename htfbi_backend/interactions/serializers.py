from rest_framework import serializers
from .models import Comment, Vote
from notes.models import Note
from django.contrib.auth.models import User


class CommentCreationSerializer(serializers.Serializer):
    note = serializers.IntegerField(required=True)
    text = serializers.CharField(required=True)
    user = serializers.IntegerField(required=True)

    def create(self, validated_data):
        text = validated_data['text']
        note_id = validated_data['note']
        user_id = validated_data['user']
        note = Note.objects.get(id=note_id)
        user = User.objects.get(id=user_id)
        
        comment_instance = Comment.objects.create(
            note=note,
            text=text,
            user=user
        )
        
        return comment_instance


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'note', 'text', 'user', 'created_at', 'updated_at']


class VoteCreationSerializer(serializers.Serializer):
    note = serializers.IntegerField(required=True)
    vote = serializers.IntegerField(required=True)
    user = serializers.IntegerField(required=True)

    def create(self, validated_data):
        vote = validated_data['vote']
        note_id = validated_data['note']
        user_id = validated_data['user']
        note = Note.objects.get(id=note_id)
        user = User.objects.get(id=user_id)
        
        comment_instance = Comment.objects.create(
            note=note,
            vote=vote,
            user=user
        )
        
        return comment_instance


class VoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ['id', 'note', 'vote', 'user', 'created_at', 'updated_at']