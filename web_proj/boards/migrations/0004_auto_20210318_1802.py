# Generated by Django 3.1.7 on 2021-03-18 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0003_auto_20210318_1322'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='board',
            name='modified_at',
        ),
        migrations.RemoveField(
            model_name='board',
            name='writer',
        ),
        migrations.AddField(
            model_name='board',
            name='email',
            field=models.EmailField(default=1, max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='board',
            name='phone',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
    ]
