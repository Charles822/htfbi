from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    video = models.ForeignKey('contents.Video', on_delete=models.CASCADE)
    response = models.OneToOneField('ai_agent.AgentResponse', on_delete=models.CASCADE)
    note_list = models.ForeignKey('lists.List', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Note for Video ID {self.video.video_id}"

    class Meta:
        app_label = 'notes'
        ordering = ['-created_at']
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
