from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class BasePagination(PageNumberPagination):
    """
    Base Pagination for model views using DRF.
    This allows for consistent usage of pagination in the application
    """

    def get_paginated_response(self, data):
        # more attr is needed by select2 inifinite scroll
        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "page": self.page.number,
                "per_page": self.page.paginator.per_page,
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "results": data,
            }
        )
