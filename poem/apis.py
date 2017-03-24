from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth import login as auth_login, \
    logout as auth_logout
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from datetime import datetime
import random
from time import sleep
import json
import django_filters.rest_framework
from rest_framework import generics
from .serializers import UserSerializer, PoemSerializer, PoemFullSerializer, ProfileSerializer, TypeSerializer
from .models import Poem, Type, Comment
# def get_object_or_json_error(model, f):
#     instance = model.objects.filter(f)
#     if instance

random.seed()
DONOT_USE_GET = 'You can not use GET method.'
NEED_LOGIN = 'You have not logged in.'

def poems(request):
    """
    All the poems, with author info.
    """
    all_poems = Poem.objects.all()
    results = PoemSerializer(all_poems, many=True)
    return JsonResponse(results.data, safe=False)

def profile(request, user_id):
    """
    Return all the poems of a user.
    """
    user_id = int(user_id)
    user = User.objects.filter(id=user_id).first()
    if not user:
        return JsonResponse({"error": "No such user."})
    return JsonResponse(ProfileSerializer(user).data, safe=False)
    # if request.method == 'GET':
    #     user_id = request.GET['user_id']
    #     if user_id:
    #         user = User.objects.filter(id=user_id)
    #         if user:
    #             poems = Poem.objects.filter(author_id=user_id)
    #             return JsonResponse(serializers.serialize('json', poems), safe=False)
    # return JsonResponse(serializers.serialize({"error": True}))

def detail(request, poem_id):
    """
    Return all comments and user of a poem.
    """
    poem_id = int(poem_id)
    poem = Poem.objects.filter(id=poem_id).first()
    result = PoemFullSerializer(poem)
    r = random.random()*1.0+0.5
    sleep(r)
    return JsonResponse(result.data, safe=False)

@csrf_protect
def create(request):
    """
    Create a new poem.
    """
    if request.user.is_authenticated:
        d = {'title':request.POST['title'],
             'content': request.POST['content'],
             'type_id': int(request.POST['type_id']),
             'pub_date': timezone.now()}
        poem = Poem(**d, author=request.user)
        poem.save()
        return JsonResponse({'id': poem.id})
    else:
        return JsonResponse({'error':True})

def update(request, poem_id):
    pass

## for types
def types(request):
    types = Type.objects.all()
    result = TypeSerializer(types, many=True).data
    return JsonResponse(result, safe=False)

## for comment

##################################################
# class CommentAPIView(generics.ListAPIView):    #
#     queryset = Comments.objects.all()          #
#     serializer_class = UserSerializer          #
#     filter_backends = (OrderingFilter,)        #
#     ordering_fields = ('pub_date',)            #
#                                                #
# comment_filter_view = CommentAPIView.as_view() #
##################################################

@csrf_protect
def comment_create(request, poem_id):
    if request.user.is_authenticated:
        if request.method == 'POST':
            print('coment create:')
            print(request.POST)
            comment = Comment.create_now(request.POST['content'], int(poem_id), request.user)
            comment.save()
            poem = Poem.objects.filter(id=int(poem_id)).first()
            result = PoemFullSerializer(poem).data
        else:
            result = {'error': DONOT_USE_GET }
    else:
        result = {'error': NEED_LOGIN}
    return JsonResponse(result)

def comments(request, poem_id):
    """
    Get all the comments of a poem, with author info.
    """
    poem_id = int(poem_id)
    poem = Poem.objects.filter(id=poem_id).first()
    if poem:
        serialized = PoemFullSerializer(poem).data
        result = {'poem_id': poem.id, 'comments': serialized['comments']}
    else:
        result = {'error': 'No such object.'}
    return JsonResponse(result)


## for authentication
@csrf_protect
@never_cache
def login(request):
    """
    Login.
    """
    if request.method == 'POST':
        print('in post')
        form = AuthenticationForm(request, data=request.POST)
        print('form ready')
        print('username'+request.POST['username'])
        if form.is_valid():
            user = form.get_user()
            result = {'id': user.id, 'username': user.username}
            auth_login(request, user)
        # username = request.POST['username']
        # user = User.objects.filter(username=username).first()
        # if user and user.password == request.POST['password']:
        #     result = {'success': True}
        #     auth_login(request, user)
        else: result = {'error': 'Username not exists or password not correct.'}
    else: result = {'errro': 'You can not use GET method.'}
    return JsonResponse(result)

def register(request):
    """
    Register.
    """
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            result = {'id': user.id, 'username': user.username}
        else:
            result = {'error': form.errors}
    else:
        result = {'error': 'You can not use GET method.'}
    return JsonResponse(result)

@csrf_protect
def logout(request):
    """
    Logout.
    """
    auth_logout(request)
    return JsonResponse({})
    # if request.method == 'POST':
    #     auth_logout(request)
    #     result = {'success': True}
    # else:
    #     result = {'error': 'You can not use GET.'}
    # return JsonResponse(result)
