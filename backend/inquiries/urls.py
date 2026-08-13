from django.urls import path
from . import views

urlpatterns = [
    path('', views.InquiryListCreateView.as_view(), name='inquiry-list-create'),
    path('<uuid:pk>/', views.InquiryDetailView.as_view(), name='inquiry-detail'),
]
