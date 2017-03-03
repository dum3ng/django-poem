from datetime import datetime

from django.test import TestCase
from django.contrib.auth.models import User

from .models import Type, Poem
# Create your tests here.

user_post=1

class WithUser(TestCase):
    def setUp(self):
        self.post = 0

    def tearDown(self):
        pass

    def create_user(self):
        self.post += 1
        user = User.objects.create_user('user%d' % self.post,'some@ga=maile.com','password')
        return user

class PoemTest(WithUser):
    def set_up(self):
        self.id=0

    def test_delete(self):
        user = self.create_user()
        print('user is %s' % user)
        type = Type(name='five')
        type.save()
        print('type id: %d' % type.id)
        poem1 = Poem(title='first poem',pub_date=datetime.now(),
                     type=type,author=user)
        poem1.save()
        print(poem1.id)
        poem1.delete()
        self.assertEqual(1, len(Type.objects.all()))
