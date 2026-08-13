from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from .models import Inquiry
from .serializers import InquirySerializer, InquiryAdminSerializer
from utils import send_inquiry_notification


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff


class InquiryListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/inquiries/ — Admin: all inquiries. Authenticated user: own inquiries.
    POST /api/inquiries/ — Anyone can create (no auth required for callback form).
    """
    def get_throttles(self):
        if self.request.method == 'POST':
            self.throttle_scope = 'contact'
            return [ScopedRateThrottle()]
        return []  # No throttling on GET for admin

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.user and self.request.user.is_staff:
            return InquiryAdminSerializer
        return InquirySerializer

    def get_queryset(self):
        qs = Inquiry.objects.all()
        user = self.request.user
        
        # Non-admin authenticated users see only their own
        if user.is_authenticated and not user.is_staff:
            return qs.filter(user=user)
        
        # Unauthenticated users see nothing
        if not user.is_authenticated:
            return Inquiry.objects.none()
        
        # Admin filters
        svc = self.request.query_params.get('service_type')
        if svc:
            qs = qs.filter(service_type=svc)
        st = self.request.query_params.get('status')
        if st:
            qs = qs.filter(status=st)
        return qs

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        inquiry = serializer.save(user=user)
        # Send email notification to admin
        send_inquiry_notification({
            'name': inquiry.name,
            'phone': inquiry.phone,
            'service_type': inquiry.service_type,
        })


class InquiryDetailView(generics.RetrieveUpdateAPIView):
    """
    GET   /api/inquiries/<id>/ — Admin: view details
    PATCH /api/inquiries/<id>/ — Admin: update status/notes
    """
    queryset = Inquiry.objects.all()
    permission_classes = [IsAdminUser]
    serializer_class = InquiryAdminSerializer
