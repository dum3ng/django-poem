import datetime

from django.test import TestCase
from django.utils import timezone
from django.urls import reverse
from django.test import Client
from .models import Question

def create_question(question_text, days):
    time = timezone.now() + datetime.timedelta(days=days)
    return Question.objects.create(question_text=question_text, pub_date=time)

class QuestionViewTests(TestCase):
    def test_index_view_with_no_questions(self):
        response =self.client.get(reverse('polls:index'))
        self.assertEqual(response.status_code, 200)
        #print(response.content)
        self.assertContains(response, 'No polls.')
        self.assertQuerysetEqual(response.context['recents'], [])

    def test_index_view_with_a_past_question(self):
        create_question('Past question.', -30)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(response.context['recents'], ['<Question: Past question.>'])

    def test_index_view_with_a_future_and_a_past_question(self):
        create_question('Future question', 2 )
        create_question('Past question', -2)
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(response.context['recents'], ['<Question: Past question>'])

    def test_detail_view_with_a_future_question(self):
        q = create_question('Future question', 2)
        response = self.client.get(reverse('polls:detail', args=(q.id,)))
        self.assertEqual(response.status_code, 404)

class QuestionMethodTests(TestCase):

    def test_recently_published(self):
        time = timezone.now() + datetime.timedelta(days=30)
        q = Question(pub_date=time)
        self.assertIs(q.was_published_recently(), False)

    def test_recently_published_old(self):
        time = timezone.now() - datetime.timedelta(days=2)
        q = Question(pub_date=time)
        self.assertIs(q.was_published_recently(), False)


    def test_recently_published_new(self):
        time = timezone.now() - datetime.timedelta(hours=1)
        q = Question(pub_date=time)
        self.assertIs(q.was_published_recently(), True)
