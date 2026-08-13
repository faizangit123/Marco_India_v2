from django.contrib import admin
from .models import GalleryItem, GallerySetting


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'is_featured', 'created_at')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'location')
    list_editable = ('is_featured',)


@admin.register(GallerySetting)
class GallerySettingAdmin(admin.ModelAdmin):
    list_display = ('active',)
