from django.conf.urls import url

from . import views

app_name = 'authen'

urlpatterns = [
    url(r'^login/$', views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^profile/$', views.profile, name='profile'),
    url(r'^register/$', views.register, name='register'),
    url(r'^profiles/(?P<id>[0-9]+)/$', views.profiles, name='profiles')
]
