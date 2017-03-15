from rest_framework import serializers
from .models import Poem, Type, Comment
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')



class CommentSerializer(serializers.ModelSerializer):
    """
    Comment, with author info.
    """
    author = UserSerializer()
    class Meta:
        model = Comment
        fields = '__all__'

class PoemSerializer(serializers.ModelSerializer):
    """
    Poem with user, no comments.
    """
    author = UserSerializer()
    class Meta:
        model = Poem
        fields = '__all__'

class PoemFullSerializer(serializers.ModelSerializer):
    """
    Poem with author, comments.
    """
    author = UserSerializer()
    comments = CommentSerializer(many=True)
    class Meta:
        model = Poem
        fields = '__all__'
