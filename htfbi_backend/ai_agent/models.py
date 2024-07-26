from django.db import models

class Response(models.Model):
    video = models.ForeignKey('contents.Video', on_delete=models.CASCADE)
    transcript = models.ForeignKey('contents.Transcript', on_delete=models.CASCADE)
    agent_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Response for Video ID {self.video.video_id}"

    class Meta:
        app_label = 'ai_agent'