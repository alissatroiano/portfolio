from django.shortcuts import render
from projects.models import Project, Category, Technology
from django.conf import settings

from django.templatetags.static import static

# Create your views here.
def project_index(request):
    projects = Project.objects.all()
    
    # Filter by multiple categories
    category_ids = request.GET.getlist('category')
    if category_ids:
        projects = projects.filter(category_id__in=category_ids)
    
    # Filter by multiple technologies
    tech_ids = request.GET.getlist('technology')
    if tech_ids:
        projects = projects.filter(technologies__in=tech_ids).distinct()
    
    # Custom ordering: websites, software, games, graphic design
    from django.db.models import Case, When, Value, IntegerField
    projects = projects.annotate(
        category_order=Case(
            When(category__name__icontains='website', then=Value(1)),
            When(category__name__icontains='software', then=Value(2)),
            When(category__name__icontains='game', then=Value(3)),
            When(category__name__icontains='graphic', then=Value(4)),
            When(category__name__icontains='illustration', then=Value(4)),
            default=Value(5),
            output_field=IntegerField()
        )
    ).order_by('category_order', '-featured', '-date_created')
    
    # Order categories in dropdown same as projects
    ordered_categories = Category.objects.annotate(
        category_order=Case(
            When(name__icontains='website', then=Value(1)),
            When(name__icontains='software', then=Value(2)),
            When(name__icontains='game', then=Value(3)),
            When(name__icontains='graphic', then=Value(4)),
            When(name__icontains='illustration', then=Value(4)),
            default=Value(5),
            output_field=IntegerField()
        )
    ).order_by('category_order', 'name')
    
    context = {
        'projects': projects,
        'categories': ordered_categories,
        'technologies': Technology.objects.all(),
        'selected_categories': category_ids,
        'selected_technologies': tech_ids,
    }
    
    return render(request, 'projects.html', context)

def project_detail(request, pk):
    project = Project.objects.get(pk=pk)
    context = {
        'project': project
    }
    return render(request, 'project_detail.html', context)