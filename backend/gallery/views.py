from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import GalleryItem, GallerySetting
from .serializers import GalleryItemSerializer


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff


class GalleryPublicListView(APIView):
    """GET /api/gallery/ — public gallery items (only if active)"""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if not GallerySetting.is_active():
            return Response({'active': False, 'results': []})
        items = GalleryItem.objects.all()
        category = request.query_params.get('category')
        if category:
            items = items.filter(category=category)
        serializer = GalleryItemSerializer(items, many=True, context={'request': request})
        return Response({
            'active': True,
            'results': serializer.data,
        })


class GalleryAdminListView(APIView):
    """GET /api/gallery/admin/ — all items + active status (admin only)"""
    permission_classes = [IsAdminUser]

    def get(self, request):
        items = GalleryItem.objects.all()
        serializer = GalleryItemSerializer(items, many=True, context={'request': request})
        return Response({
            'active': GallerySetting.is_active(),
            'results': serializer.data,
        })


class GalleryCreateView(generics.CreateAPIView):
    """POST /api/gallery/upload/ — admin upload"""
    serializer_class = GalleryItemSerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]


class GalleryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/gallery/<id>/ — get single item
    PATCH  /api/gallery/<id>/ — update item
    DELETE /api/gallery/<id>/ — delete item
    """
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]


class GallerySettingsView(APIView):
    """PATCH /api/gallery/settings/ — toggle active"""
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({'active': GallerySetting.is_active()})

    def patch(self, request):
        setting, _ = GallerySetting.objects.get_or_create(pk=1)
        active = request.data.get('active')
        if active is not None:
            setting.active = active
            setting.save()
        return Response({'active': setting.active})
