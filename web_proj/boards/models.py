from django.db import models
from accounts.models import User
import os


def get_upload_path(instance, filename):
    return os.path.join("%s" % instance.email, filename)


class Board(models.Model):
    title = models.CharField('제목', max_length=100)
    body = models.TextField('본문')
    email = models.EmailField(max_length=64)
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField('작성시간', auto_now_add=True)
    files = models.FileField(blank=True, null=True, upload_to=get_upload_path)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.email+' - '+self.title
