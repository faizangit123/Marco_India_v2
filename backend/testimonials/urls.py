from django.urls import path
from . import views

urlpatterns = [
    path('', views.TestimonialPublicListView.as_view(), name='testimonial-public'),
    path('create/', views.TestimonialCreateView.as_view(), name='testimonial-create'),
    path('all/', views.TestimonialAllView.as_view(), name='testimonial-all'),
    path('settings/', views.TestimonialSettingsView.as_view(), name='testimonial-settings'),
    path('<uuid:pk>/', views.TestimonialDetailView.as_view(), name='testimonial-detail'),
]
