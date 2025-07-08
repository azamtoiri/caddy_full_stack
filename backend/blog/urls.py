from django.urls import path
from django.urls import include

from blog.views import BlogViewSet, ping
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'blog', BlogViewSet, basename='blog')

urlpatterns = [
     path('api/', include(router.urls)),
     path('api/ping/', ping, name='ping'),
]
