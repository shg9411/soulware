from django.core.cache import cache
from django.http import JsonResponse, HttpResponse
from django.conf import settings
import html
import requests
import re
import datetime

CLEANR = re.compile('<.*?>')
URL = settings.WP_URL


def cleanString(string):
    cleaned = re.sub(CLEANR, '', html.unescape(string)).strip()
    return cleaned


def get_blog(request):
    cache_key = 'blogs{}'
    pages = cache.get("pages", None)
    page = int(request.GET.get('page', 1))
    if not pages:
        res = requests.get(URL)
        pages = int(res.headers.get("X-WP-TotalPages", 0))
        cache.set("pages", pages)
        if not pages:
            return HttpResponse(status=204)
    if page > pages:
        return HttpResponse(status=400)
    else:
        data = cache.get(cache_key.format(page), [])
        if not data:
            res = requests.get(
                URL+"?_embed&page={}".format(page))
            blogs = res.json()
            data = [{"id": blog["id"], "link": blog["link"], "date": datetime.datetime.fromisoformat(blog["date"]).timestamp(), "title": cleanString(blog["title"]["rendered"]), "subtitle": cleanString(
                blog["excerpt"]["rendered"]), "thumbnail": blog["_embedded"]["wp:featuredmedia"][0]["source_url"]} for blog in blogs]
            cache.set(cache_key.format(page), data)
        return JsonResponse({"blogs": data, "pages": pages}, json_dumps_params={'ensure_ascii': False})
