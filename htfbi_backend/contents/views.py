from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.conf import settings
from decouple import config
from rest_framework.viewsets import ModelViewSet
from .models import Video, Transcript
from .serializers import VideoSerializer, TranscriptSerializer
import googleapiclient.discovery
from youtube_transcript_api import YouTubeTranscriptApi
import json

youtube_url = 'https://www.youtube.com/watch?v=1yZegG4yikc'
#video_id = "1yZegG4yikc"

def fetch_video_info(video_id):
    # Set up the API key and YouTube API client
    api_service_name = "youtube"
    api_version = "v3"
    api_key = config('YT_API_KEY')

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=api_key)

    request = youtube.videos().list(
        part="snippet,contentDetails",
        id=video_id
    )
    response = request.execute()

    return response

# need to handle the logic to fetch the original language
def fetch_video_transcript(content_id):

    video = Video.objects.filter(id=content_id).get()
    video_yt_id = video.video_id
    video_language = video.original_language

    transcript = YouTubeTranscriptApi.get_transcript(video_yt_id, languages=[video_language])

    return transcript


class VideoViewSet(ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    @action(detail=False, methods=['post'], url_path='add_video')
    def add_video(self, request):
        if request.method == 'POST':
            video_id = request.data.get('video_id')
            if not video_id:
                return Response({"error": "Video ID is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch video info from YouTube API
            video_data = fetch_video_info(video_id)

            if 'items' not in video_data or not video_data['items']:
                return Response({"error": "Invalid video ID or no data found"}, status=status.HTTP_404_NOT_FOUND)

            # Extract the relevant data
            video_info = video_data['items'][0]['snippet']
            content_detail = video_data['items'][0]['contentDetails']

            data = {
                'video_id': video_id,
                'title': video_info['title'],
                'channel_name': video_info['channelTitle'],
                'youtube_url': youtube_url,
                'published_at': video_info['publishedAt'],
                'duration': content_detail['duration'],
                'tags': video_info.get('tags', []),
                'original_language': video_info['defaultAudioLanguage']
            }

            # Serialize the data
            serializer = VideoSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TranscriptViewSet(ModelViewSet):
    queryset = Transcript.objects.all()
    serializer_class = TranscriptSerializer

    @action(detail=False, methods=['post'], url_path='add_transcript')
    def add_transcript(self, request):
        if request.method == 'POST':
            content_id = request.data.get('content_id')
            if not content_id:
                return Response({"error": "Content_ID is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Check if the video exists
            try:
                video = Video.objects.get(id=content_id)
            except Video.DoesNotExist:
                return Response({"error": "Video not found"}, status=status.HTTP_404_NOT_FOUND)

            # Fetch transcript
            video_transcript = fetch_video_transcript(content_id)
            if video_transcript is None:
                return Response({"error": "Transcript not found or error fetching transcript"}, status=status.HTTP_404_NOT_FOUND)

            data = {
                'transcript_text': video_transcript,
                'video': video.id,
            }

            # Serialize the data
            serializer = TranscriptSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







