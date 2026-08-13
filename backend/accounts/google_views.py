from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.conf import settings
import logging

logger = logging.getLogger(__name__)
User = get_user_model()


class GoogleLoginView(APIView):
    """
    POST /api/auth/google/
    Accepts a Google credential (id_token) from the frontend,
    verifies it, and returns JWT tokens.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        credential = request.data.get('credential')
        if not credential:
            return Response(
                {'detail': 'Google credential is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not settings.GOOGLE_OAUTH_CLIENT_ID:
            return Response(
                {'detail': 'Google OAuth is not configured on the server.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        try:
            from google.oauth2 import id_token
            from google.auth.transport import requests as google_requests

            # Verify the Google ID token
            idinfo = id_token.verify_oauth2_token(
                credential,
                google_requests.Request(),
                settings.GOOGLE_OAUTH_CLIENT_ID,
            )

            # Ensure the token is from Google
            if idinfo['iss'] not in ('accounts.google.com', 'https://accounts.google.com'):
                return Response(
                    {'detail': 'Invalid token issuer.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            email = idinfo.get('email', '').lower()
            name = idinfo.get('name', '')
            google_sub = idinfo.get('sub', '')
            picture = idinfo.get('picture', '')

            if not email:
                return Response(
                    {'detail': 'Email not provided by Google.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Get or create user
            user, created = User.objects.get_or_create(
              email=email,
              defaults={
                'name': name,
                'google_id': google_sub,
                'is_active': True,
                },
              )

            # Update existing user's Google info if missing
            if not created:
                updated_fields = []
                if not user.name and name:
                    user.name = name
                    updated_fields.append('name')
                if not user.google_id and google_sub:
                    user.google_id = google_sub
                    updated_fields.append('google_id')
                if updated_fields:
                    user.save(update_fields=updated_fields)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            from accounts.serializers import UserSerializer

            logger.info(f"Google login {'created' if created else 'existing'}: {email}")

            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserSerializer(user).data,
                'created': created,
            })

        except ValueError as e:
            logger.warning(f"Google OAuth verification failed: {e}")
            return Response(
                {'detail': 'Invalid Google token. Please try again.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            logger.error(f"Google OAuth error: {e}")
            return Response(
                {'detail': 'Authentication failed. Please try again.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
