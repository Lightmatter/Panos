from rest_framework import viewsets


from .models import Category, Todo
from .pagination import BasePagination
from .serializers import CategorySerializer, TodoSerializer
from django.db.models import Q
from django_filters import rest_framework as filters


class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = BasePagination


class Todofilter(filters.FilterSet):
    category = filters.CharFilter(method="filter_category", label="Caetegory")
    search = filters.CharFilter(method="filter_search", label="Search")

    class Meta:
        model = Todo
        fields = [
            "category",
            "search",
        ]

    def filter_category(self, queryset, name, value):  # pylint: disable=unused-argument
        return queryset.filter(category__slug__istartswith=value)

    def filter_search(self, queryset, name, value):  # pylint: disable=unused-argument
        q = queryset
        if not value:
            return False
        q = q.filter(title=value)
        q = q.filter(description=value)
        return q

    # def filter_search(self, queryset, name, value):
    #     return queryset.filter(
    #         title__icontains=Q(value
    #     )
    #
    #


class TodoViewSet(viewsets.ModelViewSet):

    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = BasePagination
    filterset_class = Todofilter
