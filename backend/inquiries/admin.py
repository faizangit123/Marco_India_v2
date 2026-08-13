from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'service_type', 'status', 'created_at')
    list_filter = ('status', 'service_type', 'created_at')
    search_fields = ('name', 'phone', 'service_type')
    readonly_fields = ('id', 'created_at', 'updated_at')
    list_editable = ('status',)
