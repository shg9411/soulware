from rest_framework import viewsets, permissions

from .serializers import BoardSerializer
from .models import Board

from django.shortcuts import render


def index(request):
    return render(request, 'boards/index.html')


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def perform_create(self, serializer):
        serializer.save()

    def pre_save(self, obj):
        print(self.request.FILES.get('files'))
        obj.files = self.request.FILES.get('files')

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]

        else:
            #for test
            permission_classes = [permissions.AllowAny]
            #permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]


#여러 파일을 올릴 수 있어야 하는지?
#경로 설정을 바꿔야 하는지?
#수정이 가능해야하는지?
