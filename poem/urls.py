from django.conf.urls import url

from . import views
from . import apis

app_name = 'poem'
urlpatterns = [
    url(r'api/poems/all/$', apis.poems, name='poems'),
    url(r'api/poems/(?P<poem_id>[0-9]+)/detail/$', apis.detail, name='detail'),
    url(r'api/poems/new/$', apis.create, name='create'),
    url(r'api/poems/(?P<poem_id>[0-9]+)/update/$', apis.update, name='update'),
    url(r'api/poems/(?P<poem_id>[0-9]+)/comments/$', apis.comments, name='comments'),
    url(r'api/poems/(?P<poem_id>[0-9]+)/comments/new/$', apis.comment_create, name='comment_create'),
    url(r'api/types/', apis.types, name='types'),
    url(r'api/users/(?P<user_id>[0-9]+)', apis.profile, name='profile'),
    url(r'api/account/login/$', apis.login, name='login'),
    url(r'api/account/register/$', apis.register, name='register'),
    url(r'api/account/logout/$', apis.logout, name='logout'),
    url(r'^.*', views.index, name='index'),
]
