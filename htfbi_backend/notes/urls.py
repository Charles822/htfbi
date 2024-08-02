from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import NoteViewSet
from lists.views import ListViewSet

# Main router from lists app
router = routers.DefaultRouter()
router.register('lists', ListViewSet, basename='lists')

# Nested router for notes
lists_router = routers.NestedDefaultRouter(router, 'lists', lookup='list')
lists_router.register('notes', NoteViewSet, basename='list-notes')

urlpatterns = [
    path('', include(lists_router.urls)),
    ]