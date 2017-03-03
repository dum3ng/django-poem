from django.db import models
from django.contrib.auth.models import User

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
