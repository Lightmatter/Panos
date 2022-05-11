from rest_framework import serializers

from .models import Category, Todo


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
        ]


class TodoSerializer(serializers.ModelSerializer):
    category = CategorySerializer(required=False)

    class Meta:
        model = Todo
        fields = [
            "id",
            "title",
            "description",
            "category",
        ]
