from django.db import models
from accounts.models import User
from datetime import datetime
import uuid
import os


def get_file_path(instance, filename):
    _, ext = os.path.splitext(filename)
    _now = datetime.now()
    filename = "%s/%s/%s/%s.%s" % (_now.strftime('%Y'),
                                   _now.strftime('%m'), _now.strftime('%d'), uuid.uuid4(), ext)
    return filename


class Board(models.Model):
    title = models.CharField('제목', max_length=100)
    body = models.TextField('본문')
    email = models.EmailField(max_length=64)
    phone = models.CharField(max_length=20)
    created_at = models.DateTimeField('작성시간', auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.email+' - '+self.title


class File(models.Model):
    board = models.ForeignKey(
        'Board', related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_file_path)
    isDel = models.BooleanField(default=False)
    originName = models.CharField(max_length=128)

    def __str__(self):
        return self.file.url
