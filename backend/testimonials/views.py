from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Testimonial, TestimonialSetting
from .serializers import TestimonialSerializer


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff


class TestimonialPublicListView(APIView):
    """GET /api/testimonials/ — public: active 4-5 star testimonials (if section is active)"""
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        if not TestimonialSetting.is_active():
            return Response({'active': False, 'results': []})
        items = Testimonial.objects.filter(is_active=True, rating__gte=4)
        serializer = TestimonialSerializer(items, many=True, context={'request': request})
        return Response({
            'active': True,
            'results': serializer.data,
        })


class TestimonialCreateView(APIView):
    """POST /api/testimonials/ — admin: create a testimonial"""
    permission_classes = [IsAdminUser]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request):
        serializer = TestimonialSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TestimonialAllView(generics.ListAPIView):
    """GET /api/testimonials/all/ — admin, all testimonials"""
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminUser]
    queryset = Testimonial.objects.all()


class TestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/testimonials/<id>/ — view testimonial
    PATCH  /api/testimonials/<id>/ — update (toggle is_active, edit text, etc.)
    DELETE /api/testimonials/<id>/ — delete testimonial
    """
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminUser]
    queryset = Testimonial.objects.all()
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class TestimonialSettingsView(APIView):
    """PATCH /api/testimonials/settings/ — toggle section visibility"""
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({'active': TestimonialSetting.is_active()})

    def patch(self, request):
        setting, _ = TestimonialSetting.objects.get_or_create(pk=1)
        active = request.data.get('active')
        if active is not None:
            setting.active = active
            setting.save()
        return Response({'active': setting.active})
