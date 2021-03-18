from rest_framework import serializers
from .models import Board


class BoardSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source='writer.email')
    phone = serializers.ReadOnlyField(source='writer.phone')

    class Meta:
        model = Board
        fields = ('writer', 'email', 'phone', 'id', 'title',
                  'body', 'created_at', 'modified_at')
