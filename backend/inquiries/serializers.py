from rest_framework import serializers
from .models import Inquiry


class InquirySerializer(serializers.ModelSerializer):
    """Used for public creation and authenticated user's own inquiries."""
    class Meta:
        model = Inquiry
        fields = ['id', 'name', 'phone', 'service_type', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']

    def validate_phone(self, value):
        import re
        if not re.match(r'^[+]?[\d\s\-()]{7,20}$', value):
            raise serializers.ValidationError('Enter a valid phone number.')
        return value

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Name must be at least 2 characters.')
        return value.strip()


class InquiryAdminSerializer(serializers.ModelSerializer):
    """Used by admin for full access including status updates and notes."""
    user_email = serializers.SerializerMethodField()
    
    def get_user_email(self, obj):
        return obj.user.email if obj.user else None

    class Meta:
        model = Inquiry
        fields = [
            'id', 'name', 'phone', 'service_type', 'status',
            'admin_notes', 'user_email', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
