from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.models import User
import json
from .models import Poem, Type, Comment
from .serializers import UserSerializer, PoemSerializer, PoemFullSerializer
from django.utils import timezone
from datetime import datetime
# def get_object_or_json_error(model, f):
#     instance = model.objects.filter(f)
#     if instance


def poems(request):
    """
    All the poems, with author info.
    """
    poems = Poem.objects.all()
    results = PoemSerializer(poems, many=True)
    return JsonResponse(results.data, safe=False)

def user_profile(request):
    """
    Return all the poems of a user.
    """
    user_id = int(request.GET['user_id'])
    user = User.objects.filter(id=user_id).first()
    poems = user.poems.all()
    return JsonResponse(PoemSerializer(poems, many=True).data, safe=False)
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
    return JsonResponse(result.data, safe=False)

def create(request):
    """
    Create a new poem.
    """
    if request.user.is_authenticated:
        d = {'title':request.POST['title'],
         'content': request.POST['content'],
         'pub_date': timezone.now()}
        poem = Poem(**d, author=request.user)
        poem.save()
        return JsonResponse({'id': poem.id})
    else:
        return JsonResponse({'error':True})

def update(request, poem_id):
    pass
