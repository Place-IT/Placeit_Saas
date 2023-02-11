from rest_framework import routers

class DefaultRouter_Custom(routers.DefaultRouter):
    """
    Extends `DefaultRouter` class to add a method for extending url routes from another router.
    """
    def extend(self, router):
        """
        Extend the routes with url routes of the passed in router.

        Args:
             router: SimpleRouter instance containing route definitions.
        """
        print(router,router.registry,router.urls)
        # self.registry.extend(router.registry)