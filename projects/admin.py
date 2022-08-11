from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
		'title', 
  		'description', 
    	'created_at', 
     	'updated_at', 
      	'technologies', 
        'link', 
        'picture',
	]
    
    search_fields = [
        'title', 
        'description', 
	]
    
    list_filter = [
		'title', 
  		'description', 
    	'created_at', 
     	'updated_at',
      	'technologies',
        'link', 
        'picture',
	]
    
    list_per_page = 50
    
    fields = [
        'title',
        'description', 
        'technologies', 
        'link', 
        'picture',
        'image_url',
        'repository',
        'photo',
	]
    
    readonly_fields = ['created_at', 'updated_at', 'deleted_at']
    
    ordering = ('title',)