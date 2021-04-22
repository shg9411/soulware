from .base import *

DEBUG = False

ALLOWED_HOSTS = ['52.79.90.116']

CORS_ALLOWED_ORIGINS = [
    'http://52.79.90.116:443',
    'http://52.79.90.116:8080',
    'http://52.79.90.116:80',
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sw_web_dev',
        'USER': 'swWebAdmin',
        'PASSWORD': 'swWeb20210413$g',
        'HOST': 'pexpo-dev.cbyu1ubnsn5x.ap-northeast-2.rds.amazonaws.com',
        'PORT': '3306',
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'shg941102@gmail.com'
EMAIL_HOST_PASSWORD = 'thd@@1602'

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
