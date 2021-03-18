from rest_framework import viewsets, permissions

from .serializers import BoardSerializer
from .models import Board


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def perform_create(self, serializer):
        serializer.save()

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]

        else:
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]
