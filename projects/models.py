from django.db import models
from django.utils import timezone
now = timezone.now

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=254, null=True, blank=True)
    name = models.CharField(max_length=254)
    description = models.TextField()
    image_url = models.URLField(max_length=1024, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, )
    link = models.URLField(max_length=1024, null=True, blank=True)
    technologies = models.CharField(max_length=254, null=True, blank=True)
    # https://stackoverflow.com/questions/1737017/django-auto-now-and-auto-now-add
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(auto_now=True)

    
    def __str__(self):
        return self.name