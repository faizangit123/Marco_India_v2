from django.urls import path
from . import views

urlpatterns = [
    path('', views.CommentListCreateView.as_view(), name='comment-list-create'),
    path('all/', views.CommentAllView.as_view(), name='comment-all'),
    path('<uuid:pk>/', views.CommentDetailView.as_view(), name='comment-detail'),
]
