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
        
        vote_instance = Votes.objects.create(
            note=note,
            vote=vote,
            user=user
        )
        
        return vote_instance

class GetVoteSerializer(serializers.Serializer):
    note = serializers.IntegerField(required=True)
    user = serializers.IntegerField(required=True)

    def get_vote(self, validated_data):
        note_id = validated_data['note']
        user_id = validated_data['user']

        vote = Vote.objects.filter(note=note_id, user=user_id).first()
        
        return vote


class PatchVoteSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    vote = serializers.IntegerField(required=True)

    def patch_vote(self, validated_data):
        vote_id = validated_data['id']
        new_vote_value = validated_data['vote']

        vote = Vote.objects.filter(id=vote_id).first()

        if vote:
            vote.vote = new_vote_value
            vote.save()
            return vote
        
        return None


class VoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ['id', 'note', 'vote', 'user', 'created_at', 'updated_at']