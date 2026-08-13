from django.db import models
import uuid


class GallerySetting(models.Model):
    """Singleton — controls whether gallery is visible to public."""
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Gallery Setting'

    def save(self, *args, **kwargs):
        self.pk = 1  # Singleton
        super().save(*args, **kwargs)

    @classmethod
    def is_active(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj.active


class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ('CCTV', 'CCTV'),
        ('Telecom', 'Telecom'),
        ('Signal Boosting', 'Signal Boosting'),
        ('Networking', 'Networking'),
        ('Fiber Optic', 'Fiber Optic'),
        ('Other', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, max_length=500)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='CCTV')
    location = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
