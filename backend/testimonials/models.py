from django.db import models
import uuid


class TestimonialSetting(models.Model):
    """Singleton — controls whether testimonials section is visible."""
    active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def is_active(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj.active


class Testimonial(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, blank=True, help_text='Job title / company')
    company = models.CharField(max_length=100, blank=True)
    text = models.TextField(max_length=500)
    rating = models.PositiveSmallIntegerField(default=5)
    avatar = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.rating}★"
