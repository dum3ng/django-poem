from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required
import datetime

from .models import Poem, Type
# Create your views here.

def index(request):
    """
    Show all the rencent poems and hot poems.
    """
    poems = Poem.objects.all().order_by('-pub_date')[:20]
    return render(request, 'poem/index.html', context={"poems":poems})

def detail(request, id):
    """
    Show detail of a poem.
    """
    poem = get_object_or_404(Poem, id=id)
    return render(request, 'poem/detail.html', context={"poem":poem})

@login_required
def create(request):
    """
    Create a new poem.
    """
    # TODO: validate the data
    types = Type.objects.all()
    return render(request, 'poem/create.html', {"user":request.user, "types": types})

@login_required
def edit(request):
    return render(request, 'poem/edit.html')

@login_required
def publish(request):
    if request.method=='POST':
        type_id = request.POST['type']
        title = request.POST['title']
        content = request.POST['content']
        poem = Poem(title=title, content=content, pub_date=timezone.now(), type_id=type_id, author=request.user)
        poem.save()
        return HttpResponseRedirect(reverse('authen:profile'))
# APIs
@login_required
def like(request):
    if request.method=='POST':
        return
