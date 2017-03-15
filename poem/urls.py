from django.conf.urls import url

from . import views
from . import apis

app_name = 'poem'
urlpatterns = [
    url(r'api/poems/all/$', apis.poems, name='poems'),
    url(r'api/poems/$', apis.user_profile, name='user_profile'),
    url(r'api/poems/(?P<poem_id>[0-9]+)/detail/$', apis.detail, name='detail'),
    url(r'api/poems/new/$', apis.create, name='create'),
    url(r'api/poems/(?P<pome_id>[0-9]+)/update/$', apis.update, name='update'),
    url(r'^.*', views.index, name='index'),
]
