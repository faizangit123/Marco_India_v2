import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, name='', password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        extra_fields.pop('username', None)
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name='', password=None, **extra_fields):
        extra_fields.pop('username', None)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, name, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id         = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email      = models.EmailField(unique=True)
    name       = models.CharField(max_length=100, blank=True)
    phone      = models.CharField(max_length=20, blank=True)
    avatar     = models.ImageField(upload_to='avatars/', blank=True, null=True)
    google_id  = models.CharField(max_length=255, blank=True)
    is_active  = models.BooleanField(default=True)
    is_staff   = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return self.name or self.email