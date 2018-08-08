from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'sets', views.SetViewSet)
router.register(r'artifacts', views.ArtifactViewSet)
router.register(r'artifactslevels', views.ArtifactLevelViewSet)
router.register(r'bonus', views.BonusViewSet)
router.register(r'races', views.RaceViewSet)
router.register(r'visits', views.HitCountViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api/', include('rest_framework.urls', namespace='rest_framework')),
]
