from django.db import models  # NOQA

from django_extensions.db.models import AutoSlugField  # NOQA
from model_utils.models import TimeStampedModel  # NOQA


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = AutoSlugField(populate_from="name")

    def __str__(self):
        return self.name


class Todo(TimeStampedModel):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True)
    index = models.IntegerField(
        default=0, help_text="The index represents the order of the Todo in the list."
    )
    category = models.ForeignKey(
        Category, related_name="todos", on_delete=models.SET_NULL, null=True, blank=True
    )
    # TODO should we make it related to User? could make that a PR thing

    def __str__(self):
        return self.title
