from rest_framework import serializers
from .models import GalleryItem


class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = [
            'id', 'title', 'description', 'image', 'category',
            'location', 'is_featured', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
