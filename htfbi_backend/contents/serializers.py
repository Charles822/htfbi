from rest_framework import serializers
from .models import Video, Transcript

class VideoSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Video
        fields = ['id', 'video_id', 'title', 'channel_name', 'youtube_url', 'duration', 'original_language', 'tags', 'published_at', 'created_at']

