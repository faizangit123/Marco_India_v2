from django.contrib import admin
from .models import Testimonial, TestimonialSetting


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'company', 'rating', 'is_active', 'created_at')
    list_filter = ('is_active', 'rating')
    search_fields = ('name', 'role', 'company')
    list_editable = ('is_active',)


@admin.register(TestimonialSetting)
class TestimonialSettingAdmin(admin.ModelAdmin):
    list_display = ('active',)
