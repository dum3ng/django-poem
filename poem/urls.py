from django.conf.urls import url

from . import views

app_name = 'poem'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create/$', views.create, name='create'),
    url(r'^edit/$', views.edit, name='edit'),
    url(r'^publish/$', views.publish, name='publish'),
    url(r'^detail/(?P<id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^like/$', views.like, name='like'),
]
