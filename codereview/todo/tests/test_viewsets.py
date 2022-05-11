from django.test import TestCase
from django.urls import reverse

from model_bakery import baker


class TodoViewSetTest(TestCase):
    """Testing the TodoViewSet for basic functionality"""

    def setUp(self):
        self.todo = baker.make_recipe("codereview.todo.Todo")
        self.category = baker.make_recipe("codereview.todo.Category")

    def test_todo_viewset_returns_data__not_logged_in(self):
        url = reverse("todo-list")
        response = self.client.get(url)
        self.assertEqual(response.json().get("count"), 1)

    def test_todo_viewset_returns_correct_data(self):
        url = reverse("todo-list")

        self.client.force_login(self.user)
        response = self.client.get(url)
        rsp = response.json().get("results")[0]
        self.assertEqual(rsp["title"], self.todo.title)
        self.assertEqual(rsp["category"]["name"], self.category.name)


class CategoryViewSetTest(TestCase):
    """Testing the CategoryViewSet for basic functionality"""

    def setUp(self):
        self.category = baker.make_recipe("codereview.todo.Category")

    def test_category_viewset_returns_data__not_logged_in(self):
        url = reverse("category-list")
        response = self.client.get(url)
        self.assertEqual(response.json().get("count"), 1)

    def test_category_viewset_returns_correct_data(self):
        url = reverse("category-list")

        self.client.force_login(self.user)
        response = self.client.get(url)
        rsp = response.json().get("results")[0]
        self.assertEqual(rsp["name"], self.category.name)
