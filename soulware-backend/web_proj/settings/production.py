from .base import *

DEBUG = False

ALLOWED_HOSTS = ['localhost','127.0.0.1']

CORS_ORIGIN_WHITELIST = [
    'http://localhost:8080',
    'http://127.0.0.1:8080'
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
EMAIL_HOST_USER = "email"
EMAIL_HOST_PASSWORD = "pw"
