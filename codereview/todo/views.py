from django.db.models import ObjectDoesNotExist, ProtectedError
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Category, Todo
from .pagination import BasePagination
from .serializers import CategorySerializer, TodoSerializer


class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = BasePagination


class TodoViewSet(viewsets.ModelViewSet):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = BasePagination

    def destroy(self, request, *args, **kwargs):
        # Sets is_active to false instead of deleting
        # So that we may resurrect todos / log them
        try:
            todo = self.get_object()
            todo.is_active = False
            return Response(data="delete success")
        except ObjectDoesNotExist, ValueError:
            print("Given object does not exist!")
            return Response(data="delete success")
