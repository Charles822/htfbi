from decouple import config
import googleapiclient.discovery
from youtube_transcript_api import YouTubeTranscriptApi
import json
import sys
import os
import django

project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'htfbi_backend.settings')
django.setup()

from contents.models import Video 

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

def validate_transcript_language(transcript_list, video_language):
	for transcript in transcript_list:
		if not transcript.is_generated:
			return video_language
		return transcript.language_code

def fetch_video_transcript(content_id):

    video = Video.objects.filter(id=content_id).get()
    video_yt_id = video.youtube_video_id
    video_language = video.original_language

    # validate available transcript language
    transcript_list = YouTubeTranscriptApi.list_transcripts(video_yt_id)
    validated_language = validate_transcript_language(transcript_list, video_language)

    # get transcript with validated language
    transcript = YouTubeTranscriptApi.get_transcript(video_yt_id, languages=[validated_language])

    return transcript