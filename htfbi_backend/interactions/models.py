from django.db import models

class Vote(models.Model):
    UPVOTE = 1
    DOWNVOTE = -1
    NEUTRAL = 0

    VOTE_CHOICES = [
        (UPVOTE, 'Upvote'),
        (DOWNVOTE, 'Downvote'),
        (NEUTRAL, 'Neutral'),
    ]

    note = models.ForeignKey('notes.Note', on_delete=models.CASCADE)
    vote = models.IntegerField(choices=VOTE_CHOICES, default=NEUTRAL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        vote_type = dict(self.VOTE_CHOICES).get(self.vote, 'Unknown')
        return f"{vote_type} for Note ID {self.note.id}"

    class Meta:
        app_label = 'interactions'