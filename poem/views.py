from django.http import HttpResponseRedirect
from django.core import serializers
from django.urls import reverse
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.shortcuts import render, render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import redirect_to_login
from django.views.decorators.csrf import ensure_csrf_cookie
import datetime


from .models import Poem, Type, Comment
# Create your views here.
@ensure_csrf_cookie
def index(request):
    """
    Show all the rencent poems and hot poems.
    """
    poems = Poem.objects.all().order_by('-pub_date')[:20]
    return render(request, 'poem/index.html', context={"poems":poems})

def detail(request, poem_id):
    """
    Show detail of a poem.
    """
    poem = get_object_or_404(Poem, id=poem_id)
    comments = poem.comment_set.all().order_by('-pub_date')
    for c in comments:
        print('authro: %s' % c.author.username)
    return render(request, 'poem/detail.html', context={"poem":poem, "comments":comments})

@login_required
def create(request):
    """
    Create a new poem.
    """
    # TODO: validate the data
    types = Type.objects.all()
    types_json = serializers.serialize('json', types)
    return render(request, 'poem/create.html',
                  {"user":request.user, "types": types, "types_json": types_json})

@login_required
def edit(request, poem_id):
    if request.method == 'POST':
        poem = get_object_or_404(Poem, id=poem_id)
        poem.title = request.POST['title']
        poem.type_id = request.POST['type']
        poem.content = request.POST['content']
        poem.save()
        return HttpResponseRedirect(reverse('poem:detail', args=(poem.id,)))
    else:
        poem = get_object_or_404(Poem, id=poem_id)
        types = Type.objects.all()
        return render(request, 'poem/edit.html', context={'poem':poem, 'types': types})

@login_required
def publish(request):
    if request.method == 'POST':
        type_id = request.POST['type']
        title = request.POST['title']
        content = request.POST['content']
        poem = Poem(title=title, content=content, pub_date=timezone.now(), type_id=type_id, author=request.user)
        poem.save()
        return HttpResponseRedirect(reverse('authen:profile'))


def comment(request, poem_id):
    if not request.user.is_authenticated:
        return redirect_to_login(reverse('poem:detail', args=(poem_id,)))
    poem = get_object_or_404(Poem, id=int(poem_id))
    if request.method=='POST':
        content = request.POST['content']
        user_id = request.POST['user_id']
        #comment = Comment(content=content, poem_id=int(poem_id), author_id=int(user_id))
        comment = Comment.create_now(content, int(poem_id), int(user_id))
        comment.save()
        return HttpResponseRedirect(reverse('poem:detail', args=(poem_id)))

# APIs
@login_required
def like(request):
    if request.method=='POST':
        return
