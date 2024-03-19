"""
Definition of urls for MonkeysWebsite.
"""

from datetime import datetime
from django.urls import path
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from app import forms, views
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings


urlpatterns = [
    path('', views.home, name='home'),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('links/', views.links, name='links'),
    path('anketa/', views.anketa, name='anketa'),
    path('anketarez/', views.anketarez, name='anketarez'),
    path('registration/', views.registration, name= 'registration'),
    path('profile/', views.view_profile, name= 'profile'),
    path('blog/', views.blog, name= 'blog'),
    path('blogpost/<int:parametr>/', views.blogpost, name='blogpost'),
    path('newpost/', views.newpost, name= 'newpost'),
    path('videopost/', views.videopost, name= 'videopost'),
    path('study/', views.study, name= 'study'),
    path('study_html_firstpage/', views.study_html_firstpage, name= 'study_html_firstpage'),
    path('study_html_text_formatting/', views.study_html_text_formatting, name= 'study_html_text_formatting'),
    path('study_html_monkey_card/', views.study_html_monkey_card, name= 'study_html_monkey_card'),
    path('study_html_creating_form/', views.study_html_creating_form, name= 'study_html_creating_form'),
    path('study_js_budget/', views.study_js_budget, name= 'study_js_budget'),
    path('study_js_calculator/', views.study_js_calculator, name= 'study_js_calculator'),
    path('study_js_todo/', views.study_js_todo, name= 'study_js_todo'),
    path('study_js_slider/', views.study_js_slider, name= 'study_js_slider'),
    path('study_js_weather/', views.study_js_weather, name= 'study_js_weather'),
    path('login/',
         LoginView.as_view
         (
             template_name='app/login.html',
             authentication_form=forms.BootstrapAuthenticationForm,
             extra_context=
             {
                 'title': 'Вход в систему',
                 'year' : datetime.now().year,
             }
         ),
         name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()
