from django.db import models
from django.contrib.auth.models import User

class List(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    agent_role = models.ForeignKey('ai_agent.AgentRole', on_delete=models.CASCADE, default=1)
    is_closed = models.BooleanField(default=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        app_label = 'lists'



