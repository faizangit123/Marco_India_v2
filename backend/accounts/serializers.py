from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Public user representation returned by /api/auth/me/"""
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone', 'avatar', 'is_staff', 'date_joined']
        read_only_fields = ['id', 'email', 'is_staff', 'date_joined']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, min_length=8, required=False)

    class Meta:
        model = User
        fields = ['email', 'name', 'phone', 'password', 'password_confirm']

    def validate_email(self, value):
        if User.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value.lower()

    def validate(self, data):
        if data.get('password_confirm') and data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm', None)
        user = User.objects.create_user(
            # username=validated_data['email'],
            email=validated_data['email'],
            name=validated_data.get('name', ''),
            phone=validated_data.get('phone', ''),
            password=validated_data['password'],
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField(min_length=8, validators=[validate_password])


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8, validators=[validate_password])


class AdminUserSerializer(serializers.ModelSerializer):
    """Used by admin /api/admin/users/ endpoint."""
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone', 'date_joined', 'is_active', 'is_staff']
        read_only_fields = ['id', 'email', 'date_joined']
