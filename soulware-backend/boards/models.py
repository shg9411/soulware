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
    BUDGET_CHOICES = [
        ('UD', '미정'),
        ('U1', '500만원~1000만원'),
        ('U3', '1000만원~3000만원'),
        ('U5', '3000만원~5000만원'),
        ('U10', '5000만원~1억원'),
        ('O10', '1억원 이상'),
    ]

    PERIOD_CHOICES = [
        ('U2', '1~2개월'),
        ('U5', '3~5개월'),
        ('U9', '6~9개월'),
        ('O9', '9개월 이상'),
    ]
    organization = models.CharField('기관/회사명', max_length=32)
    manager = models.CharField('담당자명', max_length=8)
    phone = models.CharField('연락처', max_length=16)
    title = models.CharField('제목', max_length=32)
    email = models.EmailField('E-mail', max_length=32)
    explanation = models.TextField('프로젝트 설명')
    budget = models.CharField('예산', max_length=3, choices=BUDGET_CHOICES)
    expected_period = models.CharField(
        '예상 기간', max_length=2, choices=PERIOD_CHOICES)
    created_at = models.DateTimeField('작성시간', auto_now_add=True)

    class Meta:
        ordering = ['-created_at']


class File(models.Model):
    board = models.ForeignKey(
        'Board', related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_file_path)
    isDel = models.BooleanField(default=False)
    originName = models.CharField(max_length=128)

    def __str__(self):
        return self.file.url
