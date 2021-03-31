from rest_framework import serializers
from .models import Board, File
from django.core.files.uploadedfile import InMemoryUploadedFile


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'board', 'file', 'originName', ]


class BoardSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()

    def get_files(self, obj):
        files = File.objects.filter(board=obj, isDel=False)
        return FileSerializer(files, many=True, read_only=False).data

    class Meta:
        model = Board
        fields = ['id', 'title', 'body', 'email', 'phone', 'files', ]
