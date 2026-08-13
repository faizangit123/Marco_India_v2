from rest_framework import generics, permissions
from .models import Comment
from .serializers import CommentSerializer, CommentAdminSerializer


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff


class CommentListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/comments/?page=<slug>  — public, filtered by page (only visible)
    POST /api/comments/              — authenticated users only
    """
    serializer_class = CommentSerializer
    pagination_class = None  # ← fixes "Invalid page." error on empty results

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        qs = Comment.objects.filter(is_visible=True)
        page = self.request.query_params.get('page')
        if page:
            qs = qs.filter(page=page)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentAllView(generics.ListAPIView):
    """GET /api/comments/all/ — admin only, all comments (including hidden)"""
    serializer_class = CommentAdminSerializer
    permission_classes = [IsAdminUser]
    queryset = Comment.objects.all()
    pagination_class = None  # ← same fix for admin view


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/comments/<id>/ — admin: view detail
    PATCH  /api/comments/<id>/ — admin: toggle visibility
    DELETE /api/comments/<id>/ — admin: delete comment
    """
    serializer_class = CommentAdminSerializer
    permission_classes = [IsAdminUser]
    queryset = Comment.objects.all()
