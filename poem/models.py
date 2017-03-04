from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class Type(models.Model):
    name = models.CharField(max_length=70)

    def validate(self, poem):
        'Validate a poem if fullfil the pattern'
        pass

    def __str__(self):
        return self.name


class Poem(models.Model):
    title = models.CharField(max_length=70)
    content = models.CharField(max_length=200, default='')
    pub_date = models.DateTimeField('poem created')
    likes = models.IntegerField(default=0)

    type = models.ForeignKey(Type, null=True,on_delete=models.SET_NULL)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Comment(models.Model):
    content = models.CharField(max_length=300, default='')
    pub_date = models.DateTimeField('comment created')
    poem = models.ForeignKey(Poem, null=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content

    @classmethod
    def create_now(cls, content, poem, author):
        d = dict()
        if isinstance(poem, int):
            d['poem_id'] = poem
        else:
            d['poem'] = poem
        if isinstance(author, int):
            d['author_id'] = author
        else:
            d['author'] = author
        c = cls(content=content, pub_date=timezone.now(), **d)
        return c
