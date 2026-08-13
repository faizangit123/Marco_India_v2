from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import ScopedRateThrottle
from .models import ContactMessage
from .serializers import ContactMessageSerializer, ContactMessageAdminSerializer
from utils import send_contact_notification, send_inquiry_confirmation


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff


class ContactCreateView(generics.CreateAPIView):
    """POST /api/contact/ — anyone can submit a contact message"""
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def perform_create(self, serializer):
        msg = serializer.save()
        # Notify admin
        send_contact_notification({
            'name': msg.name,
            'email': msg.email,
            'phone': msg.phone,
            'service_type': msg.service_type,
            'message': msg.message,
        })
        # Send confirmation to customer
        send_inquiry_confirmation(msg.email, msg.name, msg.service_type)


class ContactAdminListView(generics.ListAPIView):
    """GET /api/contact/all/ — admin: list all contact messages"""
    serializer_class = ContactMessageAdminSerializer
    permission_classes = [IsAdminUser]
    queryset = ContactMessage.objects.all()


class ContactAdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/contact/<id>/ — view message details
    PATCH  /api/contact/<id>/ — update status/notes
    DELETE /api/contact/<id>/ — delete message
    """
    serializer_class = ContactMessageAdminSerializer
    permission_classes = [IsAdminUser]
    queryset = ContactMessage.objects.all()
