from django.db import models

TECHSTACK = (
        ('1','HTML'),
        ('2', 'CSS'),
        ('3', 'JavaScript'),
        ('4','Python'),
        ('5', 'CSS'),
        ('6', 'JavaScript'),
        ('7','Python'),
        ('8', 'CSS'),
        ('9', 'JavaScript'),
        
)

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=254, null=True, blank=True)
    name = models.CharField(max_length=254)
    description = models.TextField()
    image_url = models.URLField(max_length=1024, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, )
    # link = models.
    technologies = models.CharField(max_length=254, null=True, blank=True)
    techstack = models.CharField(max_length=254, choices=TECHSTACK, default='1')
    

    
    def __str__(self):
        return self.name