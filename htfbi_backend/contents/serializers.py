from rest_framework import serializers
from .models import Video, Transcript

class VideoSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), required=False)
    published_at = serializers.SerializerMethodField(
        method_name='get_formatted_date')

    class Meta:
        model = Video
        fields = ['id', 'youtube_video_id', 'title', 'channel_name', 'youtube_url', 'duration', 'original_language', 'tags', 'published_at', 'created_at']


    # Provide a more simple date information for the front end
    def get_formatted_date(self, video: Video):
        return video.published_at.strftime('%Y-%m-%d')


class TranscriptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transcript
        fields = ['id', 'transcript_text', 'video', 'created_at']

