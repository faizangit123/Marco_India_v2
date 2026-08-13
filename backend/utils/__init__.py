"""
Email utility for sending notification emails.
Uses Django's email backend (console in dev, SMTP in production).
"""
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def send_inquiry_notification(inquiry_data):
    """Send email to admin when a new service inquiry is submitted."""
    subject = f"New Service Inquiry — {inquiry_data.get('service_type', 'General')}"
    message = (
        f"A new service inquiry has been received:\n\n"
        f"Name: {inquiry_data.get('name', '-')}\n"
        f"Phone: {inquiry_data.get('phone', '-')}\n"
        f"Service: {inquiry_data.get('service_type', '-')}\n\n"
        f"Please log in to the admin panel to review and respond.\n"
        f"{settings.FRONTEND_URL}/admin/requests"
    )
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=settings.ADMIN_NOTIFICATION_EMAILS,
            fail_silently=True,
        )
        logger.info(f"Inquiry notification sent for: {inquiry_data.get('name')}")
    except Exception as e:
        logger.warning(f"Failed to send inquiry notification: {e}")


def send_contact_notification(contact_data):
    """Send email to admin when a contact form is submitted."""
    subject = f"New Contact Message — {contact_data.get('service_type', 'General')}"
    message = (
        f"A new contact message has been received:\n\n"
        f"Name: {contact_data.get('name', '-')}\n"
        f"Email: {contact_data.get('email', '-')}\n"
        f"Phone: {contact_data.get('phone', '-')}\n"
        f"Service: {contact_data.get('service_type', '-')}\n"
        f"Message:\n{contact_data.get('message', '-')}\n\n"
        f"Reply directly to: {contact_data.get('email', '-')}"
    )
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=settings.ADMIN_NOTIFICATION_EMAILS,
            fail_silently=True,
        )
        logger.info(f"Contact notification sent for: {contact_data.get('name')}")
    except Exception as e:
        logger.warning(f"Failed to send contact notification: {e}")


def send_inquiry_confirmation(email, name, service_type):
    """Send confirmation email to the customer after contact/inquiry submission."""
    subject = "We've received your inquiry — Marco India"
    message = (
        f"Hi {name},\n\n"
        f"Thank you for reaching out to Marco India!\n\n"
        f"We've received your inquiry about {service_type} and our team will "
        f"get back to you within 24 hours.\n\n"
        f"If you need immediate assistance, call us at +91 8092099110.\n\n"
        f"Best regards,\n"
        f"Team Marco India\n"
        f"www.marcoindia.in"
    )
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=True,
        )
        logger.info(f"Confirmation email sent to: {email}")
    except Exception as e:
        logger.warning(f"Failed to send confirmation email to {email}: {e}")


def send_password_reset_email(email, reset_link):
    """Send password reset email to user."""
    subject = "Password Reset — Marco India"
    message = (
        f"You requested a password reset for your Marco India account.\n\n"
        f"Click the link below to reset your password:\n"
        f"{reset_link}\n\n"
        f"This link will expire in 24 hours.\n\n"
        f"If you didn't request this, please ignore this email.\n\n"
        f"Best regards,\n"
        f"Team Marco India"
    )
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=True,
        )
        logger.info(f"Password reset email sent to: {email}")
    except Exception as e:
        logger.warning(f"Failed to send password reset email to {email}: {e}")
