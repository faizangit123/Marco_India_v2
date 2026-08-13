from django.contrib import admin
from .models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'page', 'text_preview', 'is_visible', 'created_at')
    list_filter = ('page', 'is_visible', 'created_at')
    search_fields = ('text', 'user__name', 'user__email')
    list_editable = ('is_visible',)

    def text_preview(self, obj):
        return obj.text[:80] + '...' if len(obj.text) > 80 else obj.text
    text_preview.short_description = 'Comment'
