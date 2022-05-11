from rest_framework import viewsets

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
