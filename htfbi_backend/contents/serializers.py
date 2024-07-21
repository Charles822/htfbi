from rest_framework import serializers
from .models import Video, Transcript


class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = ['id', 'video_id', 'title', 'youtube_url', 'duration', 'published_at', 'created_at', 'updated_at']

    get_video_data = serializers.SerializerMethodField(
        method_name='get_data_from_yt')

    def get_data_from_yt(self, video: Video):
        return ''