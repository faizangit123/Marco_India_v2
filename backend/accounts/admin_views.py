from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

from .serializers import AdminUserSerializer

User = get_user_model()


class IsAdminUser(permissions.BasePermission):
    """Only allow staff/admin users."""
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff


class AdminUserListView(generics.ListAPIView):
    """GET /api/admin/users/ — list all users (admin only)"""
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.all().order_by('-date_joined')
    filterset_fields = ['is_active', 'is_staff']
    search_fields = ['email', 'name', 'phone']


class AdminUserDetailView(APIView):
    """
    GET    /api/admin/users/<id>/ — get user details
    PATCH  /api/admin/users/<id>/ — update user (activate/deactivate/make admin)
    DELETE /api/admin/users/<id>/ — delete user
    """
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(AdminUserSerializer(user).data)

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = AdminUserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        if user == request.user:
            return Response({'detail': 'Cannot delete your own account from admin.'}, status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response({'detail': 'User deleted.'}, status=status.HTTP_200_OK)


class AdminStatsView(APIView):
    """GET /api/admin/stats/ — dashboard statistics"""
    permission_classes = [IsAdminUser]

    def get(self, request):
        from inquiries.models import Inquiry
        from comments.models import Comment
        from gallery.models import GalleryItem
        from contact.models import ContactMessage
        from testimonials.models import Testimonial

        now = timezone.now()

        total_inquiries = Inquiry.objects.count()
        pending_requests = Inquiry.objects.filter(status__in=['submitted', 'under_review']).count()
        total_users = User.objects.filter(is_staff=False).count()
        gallery_items = GalleryItem.objects.count()
        total_comments = Comment.objects.count()
        total_contacts = ContactMessage.objects.count()
        total_testimonials = Testimonial.objects.count()

        # Chart data — last 6 months
        chart_data = []
        for i in range(5, -1, -1):
            month_start = (now - timedelta(days=30 * i)).replace(
                day=1, hour=0, minute=0, second=0, microsecond=0
            )
            if i > 0:
                month_end = (now - timedelta(days=30 * (i - 1))).replace(
                    day=1, hour=0, minute=0, second=0, microsecond=0
                )
            else:
                month_end = now
            chart_data.append({
                'month': month_start.strftime('%b'),
                'inquiries': Inquiry.objects.filter(
                    created_at__gte=month_start, created_at__lt=month_end
                ).count(),
                'contacts': ContactMessage.objects.filter(
                    created_at__gte=month_start, created_at__lt=month_end
                ).count(),
                'users': User.objects.filter(
                    date_joined__gte=month_start, date_joined__lt=month_end, is_staff=False
                ).count(),
            })

        # Recent activity
        recent_inquiries = Inquiry.objects.order_by('-created_at')[:5].values(
            'id', 'name', 'service_type', 'status', 'created_at'
        )
        recent_contacts = ContactMessage.objects.order_by('-created_at')[:5].values(
            'id', 'name', 'email', 'service_type', 'created_at'
        )

        return Response({
            'total_inquiries': total_inquiries,
            'pending_requests': pending_requests,
            'total_users': total_users,
            'gallery_items': gallery_items,
            'total_comments': total_comments,
            'total_contacts': total_contacts,
            'total_testimonials': total_testimonials,
            'chart_data': chart_data,
            'recent_inquiries': list(recent_inquiries),
            'recent_contacts': list(recent_contacts),
        })
