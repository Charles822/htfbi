from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    video = models.ForeignKey('contents.Video', on_delete=models.CASCADE)
    response = models.OneToOneField('ai_agent.Response', on_delete=models.CASCADE)
    note_list = models.OneToOneField('lists.List', on_delete=models.CASCADE,  default=1)
    content = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Note for Video ID {self.video.video_id}"

    class Meta:
        app_label = 'notes'
