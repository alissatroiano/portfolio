from django.db import models
import os
from django.conf import settings

from django.utils import timezone
now = timezone.now


def images_path():
    return os.path.join(settings.MEDIAFILES_LOCATION, 'media')

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=254, null=True, blank=True)
    name = models.CharField(max_length=254)
    description = models.TextField()
    image_url = models.URLField(max_length=1024, null=True, blank=True)
    link = models.URLField(max_length=1024, null=True, blank=True)
    technologies = models.CharField(max_length=254, null=True, blank=True)
    picture = models.ImageField(null=True, blank=True, upload_to='media')
    # https://stackoverflow.com/questions/1737017/django-auto-now-and-auto-now-add
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)
    photo = models.ImageField(null=True, blank=True, upload_to='projects')
    repository = models.URLField(max_length=1024, null=True, blank=True)

    def __str__(self):
        return self.name