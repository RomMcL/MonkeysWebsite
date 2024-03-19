"""
Definition of views.
"""

from asyncio.windows_events import NULL
from datetime import datetime
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.http import HttpRequest
from django.contrib.auth.forms import UserCreationForm
from django.db import models
from django.db.models import Count, Sum, Avg, Max, Min
from .models import Profile
from .models import Blog
from .models import Comment # использование модели комментариев
from .models import MonkeyPoll
from .forms import CommentForm # использование формы ввода комментария
from .forms import BlogForm # использование формы ввода статьи блога
from app.forms import AnketaForm
from django.core.serializers.json import DjangoJSONEncoder
import json

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html',
        {
            'title':'Главная',
            'year':datetime.now().year,
        }
    )

def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/contact.html',
        {
            'title':'Контакты',
            'message':'Страница с моими контактами.',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/about.html',
        {
            'title':'Информация о нас',
            'message':'Мартышка и её автор.',
            'year':datetime.now().year,
        }
    )

def links(request):
    """Renders the links page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/links.html',
        {
            'title':'Полезные ресурсы',
            'message':'Справочники и прочие полезные материалы на сторонних ресурсах.',
            'year':datetime.now().year,
        }
    )

def anketa(request):
    """Renders the anketa page."""
    
    current_respondent = request.user
    
    

    data = None
    
    gender = {'1': 'Самец', '2': 'Самка'}
    type_monkey = {'1': 'Гамадрил', '2': 'Горилла', '3': 'Макака', '4': 'Мартышка',
                   '5': 'Орангутан', '6': 'Павиан', '7': 'Шимпанзе'}
    food = {'banan': 'Банан',
            'pear': 'Груша',
            'orange': 'Апельсин',
            'apple': 'Яблочко',
            'kiwi': 'Киви',
            'mushroom': 'Грибочки',
            'alco_bloh': 'Забродивший фрукт с солёными блошками'}
    diet = []
    if request.method == 'POST':
        form = AnketaForm(request.POST)
        if form.is_valid():
            data = dict()
            data['name'] = form.cleaned_data['name']
            data['type_monkey'] = type_monkey[ form.cleaned_data['type_monkey'] ]
            data['gender'] = gender[ form.cleaned_data['gender'] ]
            data['job'] = form.cleaned_data['job']
            
            for eat in food.keys():
                if(form.cleaned_data[eat] == True):
                   diet.append(food[eat])
            if  len(diet) != 0:    
                data['diet'] = ', '.join(diet)
            else:
                data['diet'] = 'Ничего! Вы на диете?'
                       
            data['message'] = form.cleaned_data['message']
            
            if  form.cleaned_data['email'] != '':    
                data['email'] = form.cleaned_data['email']
            else:
                data['email'] = 'остался тайной'
             

            if current_respondent.is_authenticated:
                
                poll_completed = current_respondent.profile.poll
                completed_poll_id = current_respondent.profile.poll_id
                
                if poll_completed == False:
                    """ Записываем в базу в базу """
            
                    monkey_poll = MonkeyPoll(
                    name = data['name'],
                    type_monkey = data['type_monkey'],
                    gender = data['gender'],
                    job = data['job'],
                    diet = data['diet'],
                    message = data['message'],
                    email = data['email'],
                    banan = form.cleaned_data['banan'],
                    pear = form.cleaned_data['pear'],
                    orange = form.cleaned_data['orange'],
                    apple = form.cleaned_data['apple'],
                    kiwi = form.cleaned_data['kiwi'],
                    mushroom = form.cleaned_data['mushroom'],
                    alco_bloh = form.cleaned_data['alco_bloh'],
                    date = datetime.now(),
                    autor_id = current_respondent.id,
                    )           
                    monkey_poll.save()
                    

                    write =  Profile.objects.get(user_id=current_respondent)

                    write.poll= True
                    write.poll_id= MonkeyPoll.objects.get(autor_id=current_respondent.id).id
                    write.save()                   
                                        
                else:
                    overwriting = MonkeyPoll.objects.get(id=completed_poll_id)
                    
                    overwriting.name = data['name']
                    overwriting.type_monkey = data['type_monkey']
                    overwriting.gender = data['gender']
                    overwriting.job = data['job']
                    overwriting.diet = data['diet']
                    overwriting.message = data['message']
                    overwriting.email = data['email']
                    overwriting.banan = form.cleaned_data['banan']
                    overwriting.pear = form.cleaned_data['pear']
                    overwriting.orange = form.cleaned_data['orange']
                    overwriting.apple = form.cleaned_data['apple']
                    overwriting.kiwi = form.cleaned_data['kiwi']
                    overwriting.mushroom = form.cleaned_data['mushroom']
                    overwriting.alco_bloh = form.cleaned_data['alco_bloh']
                    overwriting.date = datetime.now()
 
                    overwriting.save()

                    """ Закончили запись """
                     
            form = None
            
    else:
        form = AnketaForm()
    
    return render(
        request,
        'app/anketa.html',
        {
            'form': form,
            'data': data
            }
        )

def anketarez(request):
    
    first3 = MonkeyPoll.objects.values("name", "type_monkey","gender","job","diet","message","date").order_by("date")[0:3]
    last3 = MonkeyPoll.objects.values("name", "type_monkey","gender","job","diet","message","date").order_by("-date")[0:3:-1]
    males_count = MonkeyPoll.objects.values("gender").filter(gender="Самец").count()
    females_count = MonkeyPoll.objects.values("gender").filter(gender="Самка").count()
    hamadryas_count = MonkeyPoll.objects.values("type_monkey").filter(type_monkey="Гамадрил").count()
    gorilla_count = MonkeyPoll.objects.values("type_monkey").filter(type_monkey="Горилла").count()
    macaque_count = MonkeyPoll.objects.values("type_monkey").filter(type_monkey="Макака").count()
    monkey_count = MonkeyPoll.objects.values("type_monkey").filter(type_monkey="Мартышка").count()
    orangutan_count = MonkeyPoll.objects.values("type_monkey").filter(type_monkey="Орангутан").count()
    baboon_count = MonkeyPoll.objects.values("type_monkey").filter(type_monkey="Павиан").count()
    chimpanzee_count = MonkeyPoll.objects.values("type_monkey").filter(type_monkey="Шимпанзе").count()
    banan_all = MonkeyPoll.objects.values("banan").filter(banan="1").count()
    pear_all = MonkeyPoll.objects.values("pear").filter(pear="1").count()
    orange_all = MonkeyPoll.objects.values("orange").filter(orange="1").count()
    apple_all = MonkeyPoll.objects.values("apple").filter(apple="1").count()
    kiwi_all = MonkeyPoll.objects.values("kiwi").filter(kiwi="1").count()
    mushroom_all = MonkeyPoll.objects.values("mushroom").filter(mushroom="1").count()
    alco_bloh_all = MonkeyPoll.objects.values("alco_bloh").filter(alco_bloh="1").count()
    
    
    data_diet = {"males_banan": MonkeyPoll.objects.values("gender", "banan").filter(gender="Самец").filter(banan="1").count(),
            "males_pear": MonkeyPoll.objects.values("gender", "pear").filter(gender="Самец").filter(pear="1").count(),
            "males_orange": MonkeyPoll.objects.values("gender", "orange").filter(gender="Самец").filter(orange="1").count(),
            "males_apple": MonkeyPoll.objects.values("gender", "apple").filter(gender="Самец").filter(apple="1").count(),
            "males_kiwi": MonkeyPoll.objects.values("gender", "kiwi").filter(gender="Самец").filter(kiwi="1").count(),
            "males_mushroom": MonkeyPoll.objects.values("gender", "mushroom").filter(gender="Самец").filter(mushroom="1").count(),
            "males_alco": MonkeyPoll.objects.values("gender", "alco_bloh").filter(gender="Самец").filter(alco_bloh="1").count(),
            "females_banan": MonkeyPoll.objects.values("gender", "banan").filter(gender="Самка").filter(banan="1").count(),
            "females_pear": MonkeyPoll.objects.values("gender", "pear").filter(gender="Самка").filter(pear="1").count(),
            "females_orange": MonkeyPoll.objects.values("gender", "orange").filter(gender="Самка").filter(orange="1").count(),
            "females_apple": MonkeyPoll.objects.values("gender", "apple").filter(gender="Самка").filter(apple="1").count(),
            "females_kiwi": MonkeyPoll.objects.values("gender", "kiwi").filter(gender="Самка").filter(kiwi="1").count(),
            "females_mushroom": MonkeyPoll.objects.values("gender", "mushroom").filter(gender="Самка").filter(mushroom="1").count(),
            "females_alco": MonkeyPoll.objects.values("gender", "alco_bloh").filter(gender="Самка").filter(alco_bloh="1").count(),
            
            "hamadryas_banan": MonkeyPoll.objects.values("type_monkey", "banan").filter(type_monkey="Гамадрил").filter(banan="1").count(),
            "hamadryas_pear": MonkeyPoll.objects.values("type_monkey", "pear").filter(type_monkey="Гамадрил").filter(pear="1").count(),
            "hamadryas_orange": MonkeyPoll.objects.values("type_monkey", "orange").filter(type_monkey="Гамадрил").filter(orange="1").count(),
            "hamadryas_apple": MonkeyPoll.objects.values("type_monkey", "apple").filter(type_monkey="Гамадрил").filter(apple="1").count(),
            "hamadryas_kiwi": MonkeyPoll.objects.values("type_monkey", "kiwi").filter(type_monkey="Гамадрил").filter(kiwi="1").count(),
            "hamadryas_mushroom": MonkeyPoll.objects.values("type_monkey", "mushroom").filter(type_monkey="Гамадрил").filter(mushroom="1").count(),
            "hamadryas_alco": MonkeyPoll.objects.values("type_monkey", "alco_bloh").filter(type_monkey="Гамадрил").filter(alco_bloh="1").count(),
            
            "gorilla_banan": MonkeyPoll.objects.values("type_monkey", "banan").filter(type_monkey="Горилла").filter(banan="1").count(),
            "gorilla_pear": MonkeyPoll.objects.values("type_monkey", "pear").filter(type_monkey="Горилла").filter(pear="1").count(),
            "gorilla_orange": MonkeyPoll.objects.values("type_monkey", "orange").filter(type_monkey="Горилла").filter(orange="1").count(),
            "gorilla_apple": MonkeyPoll.objects.values("type_monkey", "apple").filter(type_monkey="Горилла").filter(apple="1").count(),
            "gorilla_kiwi": MonkeyPoll.objects.values("type_monkey", "kiwi").filter(type_monkey="Горилла").filter(kiwi="1").count(),
            "gorilla_mushroom": MonkeyPoll.objects.values("type_monkey", "mushroom").filter(type_monkey="Горилла").filter(mushroom="1").count(),
            "gorilla_alco": MonkeyPoll.objects.values("type_monkey", "alco_bloh").filter(type_monkey="Горилла").filter(alco_bloh="1").count(),
            
            "macaque_banan": MonkeyPoll.objects.values("type_monkey", "banan").filter(type_monkey="Макака").filter(banan="1").count(),
            "macaque_pear": MonkeyPoll.objects.values("type_monkey", "pear").filter(type_monkey="Макака").filter(pear="1").count(),
            "macaque_orange": MonkeyPoll.objects.values("type_monkey", "orange").filter(type_monkey="Макака").filter(orange="1").count(),
            "macaque_apple": MonkeyPoll.objects.values("type_monkey", "apple").filter(type_monkey="Макака").filter(apple="1").count(),
            "macaque_kiwi": MonkeyPoll.objects.values("type_monkey", "kiwi").filter(type_monkey="Макака").filter(kiwi="1").count(),
            "macaque_mushroom": MonkeyPoll.objects.values("type_monkey", "mushroom").filter(type_monkey="Макака").filter(mushroom="1").count(),
            "macaque_alco": MonkeyPoll.objects.values("type_monkey", "alco_bloh").filter(type_monkey="Макака").filter(alco_bloh="1").count(),

            "monkey_banan": MonkeyPoll.objects.values("type_monkey", "banan").filter(type_monkey="Мартышка").filter(banan="1").count(),
            "monkey_pear": MonkeyPoll.objects.values("type_monkey", "pear").filter(type_monkey="Мартышка").filter(pear="1").count(),
            "monkey_orange": MonkeyPoll.objects.values("type_monkey", "orange").filter(type_monkey="Мартышка").filter(orange="1").count(),
            "monkey_apple": MonkeyPoll.objects.values("type_monkey", "apple").filter(type_monkey="Мартышка").filter(apple="1").count(),
            "monkey_kiwi": MonkeyPoll.objects.values("type_monkey", "kiwi").filter(type_monkey="Мартышка").filter(kiwi="1").count(),
            "monkey_mushroom": MonkeyPoll.objects.values("type_monkey", "mushroom").filter(type_monkey="Мартышка").filter(mushroom="1").count(),
            "monkey_alco": MonkeyPoll.objects.values("type_monkey", "alco_bloh").filter(type_monkey="Мартышка").filter(alco_bloh="1").count(),
            
            "orangutan_banan": MonkeyPoll.objects.values("type_monkey", "banan").filter(type_monkey="Орангутан").filter(banan="1").count(),
            "orangutan_pear": MonkeyPoll.objects.values("type_monkey", "pear").filter(type_monkey="Орангутан").filter(pear="1").count(),
            "orangutan_orange": MonkeyPoll.objects.values("type_monkey", "orange").filter(type_monkey="Орангутан").filter(orange="1").count(),
            "orangutan_apple": MonkeyPoll.objects.values("type_monkey", "apple").filter(type_monkey="Орангутан").filter(apple="1").count(),
            "orangutan_kiwi": MonkeyPoll.objects.values("type_monkey", "kiwi").filter(type_monkey="Орангутан").filter(kiwi="1").count(),
            "orangutan_mushroom": MonkeyPoll.objects.values("type_monkey", "mushroom").filter(type_monkey="Орангутан").filter(mushroom="1").count(),
            "orangutan_alco": MonkeyPoll.objects.values("type_monkey", "alco_bloh").filter(type_monkey="Орангутан").filter(alco_bloh="1").count(),
            
            "baboon_banan": MonkeyPoll.objects.values("type_monkey", "banan").filter(type_monkey="Павиан").filter(banan="1").count(),
            "baboon_pear": MonkeyPoll.objects.values("type_monkey", "pear").filter(type_monkey="Павиан").filter(pear="1").count(),
            "baboon_orange": MonkeyPoll.objects.values("type_monkey", "orange").filter(type_monkey="Павиан").filter(orange="1").count(),
            "baboon_apple": MonkeyPoll.objects.values("type_monkey", "apple").filter(type_monkey="Павиан").filter(apple="1").count(),
            "baboon_kiwi": MonkeyPoll.objects.values("type_monkey", "kiwi").filter(type_monkey="Павиан").filter(kiwi="1").count(),
            "baboon_mushroom": MonkeyPoll.objects.values("type_monkey", "mushroom").filter(type_monkey="Павиан").filter(mushroom="1").count(),
            "baboon_alco": MonkeyPoll.objects.values("type_monkey", "alco_bloh").filter(type_monkey="Павиан").filter(alco_bloh="1").count(),
            
            "chimpanzee_banan": MonkeyPoll.objects.values("type_monkey", "banan").filter(type_monkey="Шимпанзе").filter(banan="1").count(),
            "chimpanzee_pear": MonkeyPoll.objects.values("type_monkey", "pear").filter(type_monkey="Шимпанзе").filter(pear="1").count(),
            "chimpanzee_orange": MonkeyPoll.objects.values("type_monkey", "orange").filter(type_monkey="Шимпанзе").filter(orange="1").count(),
            "chimpanzee_apple": MonkeyPoll.objects.values("type_monkey", "apple").filter(type_monkey="Шимпанзе").filter(apple="1").count(),
            "chimpanzee_kiwi": MonkeyPoll.objects.values("type_monkey", "kiwi").filter(type_monkey="Шимпанзе").filter(kiwi="1").count(),
            "chimpanzee_mushroom": MonkeyPoll.objects.values("type_monkey", "mushroom").filter(type_monkey="Шимпанзе").filter(mushroom="1").count(),
            "chimpanzee_alco": MonkeyPoll.objects.values("type_monkey", "alco_bloh").filter(type_monkey="Шимпанзе").filter(alco_bloh="1").count(),
            
            "random_thoughts": list(MonkeyPoll.objects.values("message"))
            }
   
    data = {"first3": first3,
            "last3": last3,
            "males_count": males_count,
            "females_count": females_count,
            "respondents_count": males_count + females_count,
            "hamadryas_count": hamadryas_count,
            "gorilla_count": gorilla_count,
            "macaque_count": macaque_count,
            "monkey_count": monkey_count,
            "orangutan_count": orangutan_count,
            "baboon_count": baboon_count,
            "chimpanzee_count": chimpanzee_count,
            "banan_all": banan_all,
            "pear_all": pear_all,
            "orange_all": orange_all,
            "apple_all": apple_all,
            "kiwi_all": kiwi_all,
            "mushroom_all": mushroom_all,
            "alco_bloh_all": alco_bloh_all,
            "data_diet": json.dumps(data_diet, cls=DjangoJSONEncoder)
            }

    return render(
        request, 'app/anketarez.html',
        data
        )


def registration(request):

    """Renders the registration page."""

    assert isinstance(request, HttpRequest)

    if request.method == "POST": # после отправки формы

        regform = UserCreationForm (request.POST)

        if regform.is_valid(): #валидация полей формы

            reg_f = regform.save(commit=False) # не сохраняем автоматически данные формы
            reg_f.is_staff = False # запрещен вход в административный раздел
            reg_f.is_active = True # активный пользователь
            reg_f.is_superuser = False # не является суперпользователем
            reg_f.date_joined = datetime.now() # дата регистрации
            reg_f.last_login = datetime.now() # дата последней авторизации
            reg_f.save() # сохраняем изменения после добавления данных

            return redirect('login') # переадресация на страницу после регистрации

    else:
        regform = UserCreationForm() # создание объекта формы для ввода данных нового пользователя

    return render(
        request,
        'app/registration.html',
        {
        'regform': regform, # передача формы в шаблон веб-страницы
        'year':datetime.now().year,
        }
    )

def view_profile(request):
        
    current_respondent = request.user
    poll_rez = {'name': 'Не известно',
                'type_monkey': 'Не известно',
                'gender': 'Не известно',
                'job': 'Не известно',
                'diet': 'Не известно',
                'message': 'Не известно',                
                'email': 'Не известно',
               }
    if current_respondent.profile.poll:
        poll = MonkeyPoll.objects.get(autor_id=current_respondent.id)
        poll_rez = {'name': poll.name,
                    'type_monkey': poll.type_monkey,
                    'gender': poll.gender,
                    'job': poll.job,
                    'diet': poll.diet,
                    'message': poll.message,                
                    'email': poll.email,
                   }
    
    return render(
        request,
        'app/profile.html',
        {
        'title':'Профиль',       
        'user': current_respondent,
        'name': poll_rez['name'],
        'type_monkey': poll_rez['type_monkey'],
        'gender': poll_rez['gender'],
        'job': poll_rez['job'],
        'diet': poll_rez['diet'],
        'message': poll_rez['message'],
        'email': poll_rez['email'],
        }       
    )

def blog(request):
    """Renders the blog page."""
    assert isinstance(request, HttpRequest)
    posts = Blog.objects.all() # запрос на выбор всех статей блога из модели
    return render(
        request,
        'app/blog.html',
        {
            'title':'Блог',
            'posts': posts, # передача списка статей в шаблон веб-страницы
            'year':datetime.now().year,
        }
    )

def blogpost(request, parametr):
    """Renders the blogpost page."""
    assert isinstance(request, HttpRequest)
    post_1 = Blog.objects.get(id=parametr) # запрос на выбор конкретной статьи по параметру
    comments = Comment.objects.filter(post=parametr)
    if request.method == "POST": # после отправки данных формы на сервер методом POST
        form = CommentForm(request.POST)
        if form.is_valid():
            comment_f = form.save(commit=False)
            comment_f.author = request.user # добавляем (так как этого поля нет в форме) в модель Комментария (Comment) в поле автор авторизованного пользователя
            comment_f.date = datetime.now() # добавляем в модель Комментария (Comment) текущую дату
            comment_f.post = Blog.objects.get(id=parametr) # добавляем в модель Комментария (Comment) статью, для которой данный комментарий
            comment_f.save() # сохраняем изменения после добавления полей
            return redirect('blogpost', parametr=post_1.id) # переадресация на ту же страницу статьи после отправки комментария
    else:
        form = CommentForm() # создание формы для ввода комментария
    return render(
        request,
        'app/blogpost.html',
        {
            'post_1': post_1, # передача конкретной статьи в шаблон веб-страницы
            'comments': comments, # передача всех комментариев к данной статье в шаблон веб-страницы
            'form': form, # передача формы добавления комментария в шаблон веб-страницы
            'year':datetime.now().year,
        }
    )


def newpost(request):
    """Renders the newpost page."""
    assert isinstance(request, HttpRequest)
   
    if request.method == "POST": # после отправки данных формы на сервер методом POST
        blogform = BlogForm(request.POST, request.FILES)
        if blogform.is_valid():
            blog_f = blogform.save(commit=False)
            blog_f.posted = datetime.now()
            blog_f.author = request.user
            blog_f.save()
            return redirect('blog') # переадресация на ту же страницу статьи после отправки комментария
    else:
        blogform = BlogForm() # создание формы для ввода данных
    return render(
        request,
        'app/newpost.html',
        {
            'blogform': blogform, # передача формы в шаблон веб-страницы
            'title': 'Добавить статью блога',
            'year':datetime.now().year,
        }
    )


     
def videopost(request):
    """Renders the video page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/videopost.html',
        {
            'title':'Видео',
            'year':datetime.now().year,
        }
    )    
  


def study(request):
    """Renders the study page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study.html',
        {         
            'year':datetime.now().year,
        }
    )


def study_html_firstpage(request):
    """Renders the study_html_firstpage page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_html_firstpage.html',
        {
            'task_title':'Первая страница Мартышки',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )

def study_html_text_formatting(request):
    """Renders the study_html_text_formatting page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_html_text_formatting.html',
        {
            'task_title':'HTML + CSS',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )

def study_html_monkey_card(request):
    """Renders the study_html_monkey_card page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_html_monkey_card.html',
        {
            'task_title':'Визитка Мартышки',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )

def study_html_creating_form(request):
    """Renders the study_html_creating_form page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_html_creating_form.html',
        {
            'task_title':'Формы и таблицы',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )

def study_js_budget(request):
    """Renders the study_js_budget page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_js_budget.html',
        {
            'task_title':'Бюджет Мартышки',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )

def study_js_calculator(request):
    """Renders the study_js_calculator page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_js_calculator.html',
        {
            'task_title':'Калькулятор',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )

def study_js_todo(request):
    """Renders the study_js_todo page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_js_todo.html',
        {
            'task_title':'Мартышкины дела',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )

def study_js_slider(request):
    """Renders the study_js_slider page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_js_slider.html',
        {
            'task_title':'Слайдер',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )

def study_js_weather(request):
    """Renders the study_js_weather page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/study/study_js_weather.html',
        {
            'task_title':'Погода сегодня',
            'task':'Задача:',
            'year':datetime.now().year,
      }
    )
