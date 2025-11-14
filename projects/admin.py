from django.contrib import admin
from .models import Project, Category, Technology

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)
    ordering = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
		'title',
        'name',
        'date_created',
        'featured',
        'badge_label',
        'badge_link',
        'badge_link_text',
        'cert_link',
        'cert_link_text',
        'badge',
  		'description', 
    	'created_at', 
     	'updated_at', 
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
        'category',
        'technologies',
        'created_at', 
        'updated_at',
        'date_created',
	]
    
    list_per_page = 50
    
    fields = [
        'title',
        'name',
        'description',
        'date_created',
        'featured',
        'badge',
        'badge_label',
        'badge_link',
        'badge_link_text',
        'cert_link',
        'cert_link_text',
        'category', 
        'technologies', 
        'link', 
        'repository',
        'image_url',
        'picture',
        'photo',
        'problem',
        'solution',
        'video_link',
        
	]
    
    filter_horizontal = ('technologies',)
    
    readonly_fields = ['created_at', 'updated_at', 'deleted_at']
    
    ordering = ('created_at',)