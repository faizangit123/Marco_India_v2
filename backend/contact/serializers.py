from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    """Public serializer for contact form submission."""
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'service_type', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Name must be at least 2 characters.')
        return value.strip()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError('Message must be at least 10 characters.')
        return value.strip()


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    """Admin serializer with status and notes."""
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'phone', 'service_type',
            'message', 'status', 'admin_notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
