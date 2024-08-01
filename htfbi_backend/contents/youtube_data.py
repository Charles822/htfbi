#!/usr/bin/env python3
from decouple import config
from .models import Video  
import googleapiclient.discovery
from youtube_transcript_api import YouTubeTranscriptApi
import json


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
    video_yt_id = video.youtube_video_id
    video_language = video.original_language

    transcript = YouTubeTranscriptApi.get_transcript(video_yt_id, languages=[video_language])

    return transcript
