from rest_framework.viewsets import ModelViewSet
from .models import AgentRole, AgentResponse
from .serializers import AgentRoleSerializer, AgentResponseSerializer

class AgentRoleViewSet(ModelViewSet):
    queryset = AgentRole.objects.all()
    serializer_class = AgentRoleSerializer


class AgentResponseViewSet(ModelViewSet):
    queryset = AgentResponse.objects.all()
    serializer_class = AgentResponseSerializer
