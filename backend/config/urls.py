"""
Root URL configuration for Marco India backend.
All API endpoints are prefixed with /api/.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def api_root(request):
    """Health check / API root endpoint."""
    return JsonResponse({
        'status': 'ok',
        'message': 'Marco India API v1',
        'endpoints': {
            'auth': '/api/auth/',
            'inquiries': '/api/inquiries/',
            'comments': '/api/comments/',
            'gallery': '/api/gallery/',
            'testimonials': '/api/testimonials/',
            'contact': '/api/contact/',
            'admin': '/api/admin/',
        }
    })


urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/inquiries/', include('inquiries.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/gallery/', include('gallery.urls')),
    path('api/testimonials/', include('testimonials.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/admin/', include('accounts.admin_urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
