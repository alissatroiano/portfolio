from django.db import models
import os
from django.conf import settings

from django.utils import timezone
now = timezone.now


def images_path():
    return os.path.join(settings.MEDIAFILES_LOCATION, 'media')

class Category(models.Model):
    name = models.CharField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = 'Technologies'
        ordering = ['name']
    
    def __str__(self):
        return self.name

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=254, null=True, blank=True)
    name = models.CharField(max_length=254)
    description = models.TextField()
    image_url = models.URLField(max_length=1024, null=True, blank=True)
    link = models.URLField(max_length=1024, null=True, blank=True)
    repository = models.URLField(max_length=1024, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    technologies = models.ManyToManyField(Technology, blank=True, related_name='projects')
    problem = models.TextField(null=True, blank=True)
    solution = models.TextField(null=True, blank=True)
    video_link = models.URLField(max_length=1024, null=True, blank=True)
    picture = models.ImageField(null=True, blank=True, upload_to='media')
    photo = models.ImageField(null=True, blank=True, upload_to='projects')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)

def get_category(c):
    return dict((project.id, project.name) for project in Project.objects.filter(category=c).order_by('name'))

def get_category_projects(x):
    return dict(Project.objects.filter(category=x).order_by('name'))

    class Meta:
        verbose_name_plural = 'Projects'
        ordering = ['-created_at']
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name