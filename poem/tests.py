from datetime import datetime

from django.test import TestCase
from django.contrib.auth.models import User
from django.utils import timezone

from .models import Type, Poem
from .serializers import ProfileSerializer

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

class WithPoem(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def create_poem(self, title, content, user):
        poem = Poem(title=title, content=content, author=user, pub_date=timezone.now())
        poem.save()
        return poem


class PoemTest(WithUser):
    def setUp(self):
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

class SerializerTest(WithUser, WithPoem):
    def setUp(self):
        pass

    def test_serialize(self):
        user = self.create_user()
        p0 = self.create_poem('title0', 'c0', user)
        p1 = self.create_poem('title1', 'c1', user)
        result = ProfileSerializer(user).data
        self.assertEqual(len(result.poems), 2)
