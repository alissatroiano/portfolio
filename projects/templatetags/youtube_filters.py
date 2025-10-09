from django import template
import re

register = template.Library()

@register.filter
def youtube_embed_url(url):
    """Convert YouTube URL to embed format"""
    if not url:
        return url
    
    # Extract video ID from various YouTube URL formats
    youtube_regex = r'(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})'
    match = re.search(youtube_regex, url)
    
    if match:
        video_id = match.group(1)
        return f'https://www.youtube.com/embed/{video_id}'
    
    return url