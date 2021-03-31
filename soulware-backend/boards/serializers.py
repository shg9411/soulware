from rest_framework import serializers
from .models import Board, File

# 용량 20MB 제한
MAX_SIZE = 1024*1024*20


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ['id', 'board', 'file', 'originName', ]

    def validate(self, data):
        if data['file'].size > MAX_SIZE:
            raise serializers.ValidationError("File size is to Big")
        return data


class BoardSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()

    def get_files(self, obj):
        files = File.objects.filter(board=obj, isDel=False)
        return FileSerializer(files, many=True, read_only=False).data

    class Meta:
        model = Board
        fields = ['id', 'title', 'body', 'email', 'phone', 'files', ]

    def validate(self, data):
        for n in data['phone']:
            try:
                n = int(n)
            except ValueError:
                raise serializers.ValidationError(
                    {"Phone number": "Phone number is invalid"})
        if not 7 < len(data['phone']) < 16:
            raise serializers.ValidationError(
                {"Phone number": "Phone number is too short or too long"}
            )
        return data
