from django.db import models

class Note(models.Model):
    video = models.ForeignKey('contents.Video', on_delete=models.CASCADE)
    response = models.OneToOneField('ai_agent.Response', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Note for Video ID {self.video.video_id}"

    class Meta:
        app_label = 'notes'
