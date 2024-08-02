"""
URL configuration for htfbi_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from debug_toolbar.toolbar import debug_toolbar_urls
from rest_framework_nested import routers
from lists.views import ListViewSet
from notes.views import NoteViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Main router for lists
main_router = routers.DefaultRouter()
main_router.register('lists', ListViewSet, basename='lists')

# Nested router for notes
nested_router = routers.NestedDefaultRouter(main_router, 'lists', lookup='list')
nested_router.register('notes', NoteViewSet, basename='list-notes')


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('playground/', include('playground.urls')),
    path('ai_agent/', include('ai_agent.urls')),
    path('contents/', include('contents.urls')),
    path('customers/', include('customers.urls')),
    path('interactions/', include('interactions.urls')),
    path('lists/', include('lists.urls')),
    path('lists/', include(nested_router.urls)),
    path('notes/', include('notes.urls'))

] + debug_toolbar_urls()