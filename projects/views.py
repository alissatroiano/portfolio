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
    
    # Custom ordering: websites, software, games, graphic design
    from django.db.models import Case, When, Value, IntegerField
    projects = projects.annotate(
        category_order=Case(
            When(category__name__iexact='websites', then=Value(1)),
            When(category__name__iexact='software', then=Value(2)),
            When(category__name__iexact='games', then=Value(3)),
            When(category__name__iexact='graphic design', then=Value(4)),
            default=Value(5),
            output_field=IntegerField()
        )
    ).order_by('category_order', '-created_at')
    
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