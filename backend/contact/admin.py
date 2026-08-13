from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'service_type', 'status', 'created_at')
    list_filter = ('status', 'service_type', 'created_at')
    search_fields = ('name', 'email', 'message')
    list_editable = ('status',)
    readonly_fields = ('id', 'created_at', 'updated_at')
