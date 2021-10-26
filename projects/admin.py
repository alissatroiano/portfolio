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
        'image',
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
        'image',
	]
    
    list_per_page = 50
    
    fields = [
        'title',
        'description', 
        'technologies', 
        'link', 
        'image',
	]
    
    readonly_fields = ['created_at', 'updated_at', 'deleted_at']
    
    ordering = ('name',)