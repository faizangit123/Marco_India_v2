from django.db import models
import uuid


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        'accounts.User', on_delete=models.CASCADE, related_name='comments'
    )
    page = models.CharField(max_length=100, db_index=True)
    text = models.TextField(max_length=1000)
    is_visible = models.BooleanField(default=True, help_text='Admin can hide inappropriate comments')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} on {self.page}: {self.text[:50]}"
