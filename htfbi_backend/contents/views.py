from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.viewsets import ModelViewSet
from .models import Video, Transcript
from .serializers import VideoSerializer

def index(request):
    return HttpResponse("Hello, world!")

class VideoViewSet(ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer