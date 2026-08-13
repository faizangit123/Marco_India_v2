from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_avatar = serializers.ImageField(source='user.avatar', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user_name', 'user_avatar', 'page', 'text', 'created_at']
        read_only_fields = ['id', 'user_name', 'user_avatar', 'created_at']

    def validate_text(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError('Comment must be at least 3 characters.')
        return value.strip()


class CommentAdminSerializer(serializers.ModelSerializer):
    """Admin view with visibility toggle and user email."""
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user_name', 'user_email', 'page', 'text', 'is_visible', 'created_at']
        read_only_fields = ['id', 'user_name', 'user_email', 'created_at']
