from rest_framework import serializers
from .models import Note
from ai_agent.models import AgentResponse, AgentRole
from contents.models import Video, Transcript
from lists.models import List
from django.contrib.auth.models import User
from contents.youtube_data import fetch_video_info, fetch_video_transcript, extract_video_id
from ai_agent.llama3_agent import get_agent_response
from contents.serializers import VideoSerializer
from ai_agent.serializers import AgentResponseSerializer


class NoteCreationSerializer(serializers.Serializer):
    youtube_url = serializers.URLField(required=True)
    note_list = serializers.IntegerField(required=True)
    owner = serializers.IntegerField(required=True)

    def create(self, validated_data):
        # get the youtube video ID
        youtube_url = validated_data['youtube_url']
        youtube_video_id = extract_video_id(youtube_url)

        # Create the Video instance
        video_data = fetch_video_info(youtube_video_id)

        if 'items' not in video_data or not video_data['items']:
            return Response({"error": "Invalid video ID or no data found"}, status=status.HTTP_404_NOT_FOUND)

        # Extract the relevant data
        video_info = video_data['items'][0]['snippet']
        content_detail = video_data['items'][0]['contentDetails']

        video_instance = Video.objects.create(
            youtube_video_id=youtube_video_id,
            title=video_info['title'],
            channel_name=video_info['channelTitle'],
            youtube_url=youtube_url,
            published_at=video_info['publishedAt'],
            duration=content_detail['duration'],
            tags=video_info.get('tags', []),
            original_language=video_info['defaultAudioLanguage']
        )
        
        # Create the Transcript instance

        # Check if the video exists
        try:
            video_instance
        except video_instance.DoesNotExist:
            return Response({"error": "Video not found"}, status=status.HTTP_404_NOT_FOUND)
        
        video_transcript = fetch_video_transcript(video_instance.id) # Fetch transcript
        
        if video_transcript is None: #catch error
            return Response({"error": "Transcript not found or error fetching transcript"}, status=status.HTTP_404_NOT_FOUND)

        transcript_instance = Transcript.objects.create(
            transcript_text=video_transcript,
            video=video_instance,
        )

        # Create the AgentResponse instance
        
        # get agent_id via the List
        list_id = validated_data['note_list']
        owner_id = validated_data['owner']
        list_instance = List.objects.get(id=list_id)
        agent_id = list_instance.agent_role_id
        agent_role = AgentRole.objects.get(id=agent_id)
        owner = User.objects.get(id=owner_id)
        
        # generate response with the agent
        agent_response = get_agent_response(transcript_instance.transcript_text, agent_role.description)


        agent_response_instance = AgentResponse.objects.create(
            video=video_instance,
            transcript=transcript_instance,
            agent_role=agent_role,
            agent_response=agent_response,
        )
        
        # Create the Note instance
        note_instance = Note.objects.create(
            video=video_instance,
            response=agent_response_instance,
            note_list=list_instance,
            owner=owner,
            )

        return note_instance


class NoteSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)
    response = AgentResponseSerializer(read_only=True)
    comments_count = serializers.SerializerMethodField(
        method_name='get_comments_count')
    votes_count = serializers.SerializerMethodField(
        method_name='get_votes_count')

    class Meta:
        model = Note
        fields = ['id', 'video', 'response', 'note_list', 'owner', 'comments_count', 'votes_count', 'created_at']


    def get_comments_count(self, note: Note):
        return note.comments.count()

    def get_votes_count(self, note: Note):
        return note.votes.count()




