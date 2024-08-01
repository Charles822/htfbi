from rest_framework.viewsets import ModelViewSet
from .models import Video, Transcript
from .serializers import VideoSerializer, TranscriptSerializer


class VideoViewSet(ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class TranscriptViewSet(ModelViewSet):
    queryset = Transcript.objects.all()
    serializer_class = TranscriptSerializer








