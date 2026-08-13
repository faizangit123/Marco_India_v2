"""Admin-only API endpoints: /api/admin/..."""
from django.urls import path
from . import admin_views

urlpatterns = [
    path('users/', admin_views.AdminUserListView.as_view(), name='admin-users'),
    path('users/<uuid:pk>/', admin_views.AdminUserDetailView.as_view(), name='admin-user-detail'),
    path('stats/', admin_views.AdminStatsView.as_view(), name='admin-stats'),
]
