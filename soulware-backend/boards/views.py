from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404
from django.db import transaction
from .serializers import BoardSerializer, FileSerializer
from .models import Board, File
import os


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        instance_data = request.data
        data = {key: value for key, value in instance_data.items()}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        uploded_files = []
        try:
            with transaction.atomic():
                instance = serializer.save()
                if request.FILES:
                    files = dict((request.FILES).lists()).get('files', None)
                    if files:
                        for file in files:
                            file_data = {}
                            file_data['board'] = instance.pk
                            file_data['file'] = file
                            file_data['originName'] = file.name
                            file_serializer = FileSerializer(data=file_data)
                            file_serializer.is_valid(raise_exception=True)
                            uploded_files.append(
                                file_serializer.save().file.path)
        except:
            for file in uploded_files:
                if os.path.exists(file):
                    os.remove(file)
                else:
                    pass
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.data)

    @transaction.atomic
    def partial_update(self, request, *args, **kwargs):
        instance = self.queryset.get(pk=kwargs.get('pk'))
        serializer = self.serializer_class(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        uploded_files = []
        try:
            with transaction.atomic():
                instance = serializer.save()
                if request.FILES:
                    files = dict((request.FILES).lists()).get('files', None)
                    if files:
                        for file in files:
                            file_data = {}
                            file_data['board'] = instance.pk
                            file_data['file'] = file
                            file_data['originName'] = file.name
                            file_serializer = FileSerializer(
                                data=file_data)
                            file_serializer.is_valid(raise_exception=True)
                            uploded_files.append(
                                file_serializer.save().file.path)
                if request.POST.get('deleted_files[]', None):
                    for num in map(int, request.POST.getlist('deleted_files[]')):
                        try:
                            file = File.objects.get(pk=num)
                            file_path = file.file.path
                            if os.path.exists(file_path):
                                os.remove(file_path)
                            file.isDel = True
                            file.save()
                        except File.DoesNotExist:
                            pass
        except:
            for file in uploded_files:
                if os.path.exists(file):
                    os.remove(file)
                else:
                    pass
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]

        else:
            # for test
            # permission_classes = [permissions.AllowAny]
            permission_classes = [permissions.IsAdminUser]

        return [permission() for permission in permission_classes]