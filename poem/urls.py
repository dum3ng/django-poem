from django.conf.urls import url

from . import views

app_name = 'poem'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create/$', views.create, name='create'),
    url(r'^edit/(?P<poem_id>[0-9]+)$', views.edit, name='edit'),
    url(r'^publish/$', views.publish, name='publish'),
    url(r'^detail/(?P<poem_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'comment/(?P<poem_id>[0-9]+)/$', views.comment, name='comment'),
    url(r'^like/$', views.like, name='like'),
]
