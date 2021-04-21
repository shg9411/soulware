from rest_framework import serializers
from .models import Board, File
import os


class FileSerializer(serializers.ModelSerializer):
    size = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ['id', 'board', 'file', 'originName', 'size']

    def get_size(self, obj):
        return obj.file.size


class BoardSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()
    budget_display = serializers.CharField(
        source='get_budget_display', required=False, read_only=True)
    expected_period_display = serializers.CharField(
        source='get_expected_period_display', required=False, read_only=True)

    def get_files(self, obj):
        files = File.objects.filter(board=obj, isDel=False)
        return FileSerializer(files, many=True, read_only=False).data

    class Meta:
        model = Board
        fields = ['id', 'organization', 'manager', 'phone', 'title',
                  'email', 'explanation', 'created_at', 'files', 'budget', 'expected_period', 'budget_display', 'expected_period_display']

    def validate_phone(self, value):
        for n in value:
            try:
                n = int(n)
            except ValueError:
                raise serializers.ValidationError(
                    {"Phone number": "Phone number is invalid"})
        if not 7 < len(value) < 17:
            raise serializers.ValidationError(
                {"Phone number": "Phone number is too short or too long"}
            )
        return value
