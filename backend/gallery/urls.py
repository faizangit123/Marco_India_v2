from django.urls import path
from . import views

urlpatterns = [
    path('', views.GalleryPublicListView.as_view(), name='gallery-public'),
    path('upload/', views.GalleryCreateView.as_view(), name='gallery-create'),
    path('admin/', views.GalleryAdminListView.as_view(), name='gallery-admin'),
    path('settings/', views.GallerySettingsView.as_view(), name='gallery-settings'),
    path('<uuid:pk>/', views.GalleryDetailView.as_view(), name='gallery-detail'),
]
