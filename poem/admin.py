from django.contrib import admin

# Register your models here.
from .models import Type, Poem

class PoemInline(admin.TabularInline):
    model = Poem
    extra = 3

class TypeAdmin(admin.ModelAdmin):
    inlines = [PoemInline]

class PoemAdmin(admin.ModelAdmin):
    pass

admin.site.register(Type, TypeAdmin)
admin.site.register(Poem, PoemAdmin)
