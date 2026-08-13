from django.urls import path
from . import views

urlpatterns = [
    path('', views.ContactCreateView.as_view(), name='contact-create'),
    path('all/', views.ContactAdminListView.as_view(), name='contact-admin-list'),
    path('<uuid:pk>/', views.ContactAdminDetailView.as_view(), name='contact-admin-detail'),
]
