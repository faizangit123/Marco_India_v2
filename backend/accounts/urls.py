from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .google_views import GoogleLoginView

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('google/', GoogleLoginView.as_view(), name='google-login'),
    path('me/', views.MeView.as_view(), name='me'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),
    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset/confirm/', views.PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('delete-account/', views.DeleteAccountView.as_view(), name='delete-account'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
