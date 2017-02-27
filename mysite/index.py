from django.http import HttpResponse

def view(req):
    return HttpResponse('this is the index page')
