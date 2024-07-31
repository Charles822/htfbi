import os
import sys
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from django.conf import settings
from .models import List
from .serializers import ListSerializer, ListCreationSerializer

class ListViewSet(ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer

    @action(detail=False, methods=['post'], url_path='add_list')
    def add_agent(self, request):
        serializer = ListCreationSerializer(data=request.data.get('list_info', {}))
        
        if serializer.is_valid():
            list_instance = serializer.save()
            response_serializer = ListSerializer(list_instance)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
