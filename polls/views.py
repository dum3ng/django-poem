from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.views import generic
from .models import Question
from .models import Choice
# Create your views here.


class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'recents'

    def get_queryset (self):
        return Question.objects.filter(pub_date__lte=timezone.now()).order_by('-pub_date')[:5]

class DetailView(generic.DetailView):
    model  = Question

    def get_queryset(self):
        return Question.objects.filter(pub_date__lte=timezone.now())

class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/question_results.html'

def vote(request, question_id):
    question = get_object_or_404 (Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get (pk=request.POST ['choice'])
    except (KeyError, Choice.DoesNotExist):
        return render (request, 'polls/question_detail.html',{'question':question,'error_message': 'you did not select a choice.'})
    else:
        selected_choice.votes += 1
        selected_choice.save ()
        return HttpResponseRedirect(reverse ('polls:results', args=(question.id,)))
