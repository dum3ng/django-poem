from django.shortcuts import render, get_object_or_404
from django.contrib.auth import login as auth_login, logout
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth import views
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib import messages
from django.utils.translation import gettext as _
# Create your views here.

def login(request):
    # if request.method=='POST':
    #     username = request.POST['username']
    #     password = request.POST['password']
    #     user = authenticate( username=username, password=password)
    #     if user is not None:
    #         auth_login(request, user)
    #         return HttpResponseRedirect(reverse('poem:index'), )
    #        # return render(request, 'poem/index.html')
    #     else:
    #         messages.error(request, _('Invalid login.'))
    #         return render(request, 'authen/login.html')
    # else:
    #     return render(request, 'authen/login.html')
    return views.login(request, template_name='authen/login.html')

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect(reverse('poem:index'))

def register(request):
    if request.method=='POST':
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.filter(username=username)
        if user is not None:
            messages.error(request, _('Username has been existed.'))
            return render(request, 'authen/register.html')
        else:
            user = User(username=username,password=password)
            user.save()
            return HttpResponseRedirect(reverse('poem:index'))
    else:
        return render(request, 'authen/register.html')

@login_required
def profile(request):
    user = request.user
    poems = user.poem_set.all()
    return render(request, 'authen/profile.html', context={"argsuser":user, "poems":poems})

def profiles(request, id):
    """
    User's profile. Can be viewed by anoymous.
    """
    if int(id)==request.user.id:
        return HttpResponseRedirect(reverse('authen:profile'))
    else:
        user = get_object_or_404(User, id=id)
        poems = user.poem_set.all()
        return render(request, 'authen/profiles.html', context={"user":user, "poems": poems})
