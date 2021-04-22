"""
WSGI config for web_proj project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

t = ['local','production']

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web_proj.settings.{}'.format(t[1]))

application = get_wsgi_application()
