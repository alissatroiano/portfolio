from django.shortcuts import render
from projects.models import Project, Category, Technology
from django.conf import settings

from django.templatetags.static import static

# Create your views here.
def project_index(request):
    projects = Project.objects.all()
    
    # Filter by category
    category_id = request.GET.get('category')
    if category_id:
        projects = projects.filter(category_id=category_id)
    
    # Filter by multiple technologies
    tech_ids = request.GET.getlist('technology')
    if tech_ids:
        projects = projects.filter(technologies__in=tech_ids).distinct()
    
    context = {
        'projects': projects,
        'categories': Category.objects.all(),
        'technologies': Technology.objects.all(),
        'selected_category': category_id,
        'selected_technologies': tech_ids,
    }
    
    return render(request, 'projects.html', context)

def project_detail(request, pk):
    project = Project.objects.get(pk=pk)
    context = {
        'project': project
    }
    return render(request, 'project_detail.html', context)