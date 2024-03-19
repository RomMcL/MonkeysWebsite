"""
Definition of forms.
"""

import email
from email import message
from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.utils.translation import gettext_lazy as _
from django.db import models
from .models import Comment
from .models import Blog
from django.utils.safestring import mark_safe


class BootstrapAuthenticationForm(AuthenticationForm):
    """Authentication form which uses boostrap CSS."""
    username = forms.CharField(max_length=254,
                               widget=forms.TextInput({
                                   'class': 'form-control',
                                   'placeholder': 'Ваш логин'}))
    password = forms.CharField(label=_("Password"),
                               widget=forms.PasswordInput({
                                   'class': 'form-control',
                                   'placeholder':'Введите пароль'}))

 

class AnketaForm(forms.Form):
    name = forms.CharField(label='Ваше имя:', min_length=2, max_length=20, widget=forms.TextInput(attrs={'placeholder':'Введите имя'}))
    type_monkey = forms.ChoiceField(label='Видовая принадлежность:', 
                               choices=(('1', 'Гамадрил'),
                                        ('2', 'Горилла'),
                                        ('3', 'Макака'),
                                        ('4', 'Мартышка'),
                                        ('5', 'Орангутан'),
                                        ('6', 'Павиан'),
                                        ('7', 'Шимпанзе')), initial=4)
    gender = forms.ChoiceField(label='Половая принадлежность:', 
                               choices=[('1', 'Самец'), ('2', 'Самка')], 
                               widget=forms.RadioSelect(attrs={'class': 'inline'}), initial=1)
    job = forms.CharField(label='Род деятельности:', min_length=2, max_length=20, widget=forms.TextInput(attrs={'placeholder':'кто вы?'}))
    banan = forms.BooleanField(label='Банан', required=False, widget=forms.CheckboxInput(attrs={'class':'custom-checkbox'}))
    pear = forms.BooleanField(label='Груша', required=False)
    orange = forms.BooleanField(label='Апельсин', required=False)
    apple = forms.BooleanField(label='Яблочко', required=False)
    kiwi = forms.BooleanField(label='Киви', required=False)
    mushroom = forms.BooleanField(label='Грибочки', required=False)
    alco_bloh = forms.BooleanField(label=mark_safe('Забродивший фрукт <br> с солёными блошками'), required=False)
    message = forms.CharField(label='Одна умная мысль:',  min_length=2, max_length=100, 
                              widget=forms.Textarea(attrs={'placeholder': 'Мысль длинной до 100 символов', 'rows':8, 'cols':25, 'style':'resize:none;'}))
    email = forms.EmailField(label='Ваш e-mail:', min_length=7, required=False, widget=forms.EmailInput({'placeholder': 'не обязательно'}))
    
    


class CommentForm (forms.ModelForm):
    class Meta:
        model = Comment # используемая модель
        fields = ('text',) # требуется заполнить только поле text
        labels = {'text': "Комментарий"} # метка к полю формы text   
        


class BlogForm(forms.ModelForm):
    class Meta:
        model = Blog       # используемая модель
        fields = ('title', 'description', 'content', 'image',) # требуется заполнить только поле text
        labels = {'title': "Заголовок", 'description': "Краткое содержание", 'content': "Полное содержание", 'image': "Картинка",} # метка к полю формы text 