from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
		'title',
        'name',
  		'description', 
    	'created_at', 
     	'updated_at', 
      	'technologies', 
        'link', 
        'picture',
        'problem',
        'solution',
        'video_link',
	]
    
    search_fields = [
        'title', 
        'name',
        'description', 
	]
    
    list_filter = [
		'title', 
  		'name',
  		'description', 
    	'created_at', 
     	'updated_at',
      	'technologies',
        'link', 
        'picture',
        'problem',
        'solution',
        'video_link',
	]
    
    list_per_page = 50
    
    fields = [
        'title',
        'name',
        'description', 
        'technologies', 
        'link', 
        'picture',
        'image_url',
        'repository',
        'photo',
        'problem',
        'solution',
        'video_link',
	]
    
    readonly_fields = ['created_at', 'updated_at', 'deleted_at']
    
    ordering = ('created_at',)