from django.core.cache import cache
from django.http import JsonResponse
import requests


def get_blog(request):
    cache_key = 'blogs'
    blogs = cache.get(cache_key, [])
    if not blogs:
        i = 1
        code = 200
        while code == 200:
            res = requests.get(
                "http://www.soulware.net/index.php/wp-json/wp/v2/posts?_embed&page={}".format(i), params=request.GET)
            code = res.status_code
            if code != 200:
                break
            data = res.json()
            blogs.extend(data)
            i += 1
        cache.set(cache_key, blogs)
    return JsonResponse({"blogs": blogs}, json_dumps_params={'ensure_ascii': False})
