"""
Definition of models.
"""

from email.policy import default
from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime
from django.urls import reverse


# Create your models here.

class Blog(models.Model):

    title = models.CharField(max_length = 100, unique_for_date = "posted", verbose_name = "Заголовок")
    description = models.TextField(verbose_name = "Краткое содержание")
    content = models.TextField(verbose_name = "Полное содержание")
    posted = models.DateTimeField(default = datetime.now(), db_index = True, verbose_name = "Опубликована")
    author = models.ForeignKey(User, null=True, blank=True, on_delete = models.SET_NULL, verbose_name = "Автор")
    image = models.FileField(default= 'temp.jpg', verbose_name = "Путь к картинке")

# Методы класса:

    def get_absolute_url(self): # метод возвращает строку с URL-адресом записи
        return reverse("blogpost", args=[str(self.id)])

    def __str__(self): # метод возвращает название, используемое для представления отдельных записей в административном разделе
        return self.title

# Метаданные – вложенный класс, который задает дополнительные параметры модели:

    class Meta:

        db_table = "Posts" # имя таблицы для модели
        ordering = ["-posted"] # порядок сортировки данных в модели ("-" означает по убыванию)
        verbose_name = "статья блога" # имя, под которым модель будет отображаться в административном разделе (для одной статьи блога)
        verbose_name_plural = "статьи блога" # тоже для всех статей блога



admin.site.register(Blog)

class Comment(models.Model):

    text = models.TextField(verbose_name = "Текст комментария")
    date = models.DateTimeField(default = datetime.now(), db_index = True, verbose_name = "Дата комментария")
    author = models.ForeignKey(User, on_delete = models.CASCADE, verbose_name = "Автор комментария")
    post = models.ForeignKey(Blog, on_delete = models.CASCADE, verbose_name = "Статья комментария")
    
# Методы класса:

    def __str__(self): # метод возвращает название, используемое для представления отдельных записей в административном разделе
        return 'Комментарий %d %s к %s' % (self.id, self.author, self.post)

# Метаданные – вложенный класс, который задает дополнительные параметры модели:

    class Meta:

        db_table = "Comment" # имя таблицы для модели
        ordering = ["-date"] # порядок сортировки данных в модели ("-" означает по убыванию)
        verbose_name = "Комментарий к статье блога" # имя, под которым модель будет отображаться в административном разделе (для одной статьи блога)
        verbose_name_plural = "Комментарии к статье блога" # тоже для всех статей блога


admin.site.register(Comment)




class MonkeyPoll(models.Model):
    
     name = models.CharField(max_length = 20, verbose_name = "Имя")
     type_monkey = models.CharField(max_length = 10, verbose_name = "Вид")
     gender = models.CharField(max_length = 6, verbose_name = "Пол")
     job = models.CharField(max_length = 20, verbose_name = "Род деятельности")
     diet = models.TextField(verbose_name = "Рацион")
     message = models.TextField(verbose_name = "Мысль")
     email = models.EmailField(verbose_name = "Почта")
     banan = models.BooleanField(default=False, verbose_name = "Банан")
     pear = models.BooleanField(default=False, verbose_name = "Груша")
     orange = models.BooleanField(default=False, verbose_name = "Апельсин")
     apple = models.BooleanField(default=False, verbose_name = "Яблочко")
     kiwi = models.BooleanField(default=False, verbose_name = "Киви")
     mushroom = models.BooleanField(default=False, verbose_name = "Грибочки")
     alco_bloh = models.BooleanField(default=False, verbose_name = "Пивас")
     date = models.DateTimeField(default = datetime.now(), db_index = True, verbose_name = "Дата ответа")
     autor_id = models.IntegerField(null=True, blank=True, verbose_name = "ID респондента")

     class Meta:
        db_table = "MonkeyPoll" # имя таблицы для модели
        verbose_name = "Ответ на опрос"
        verbose_name_plural = "Опрос Мартышки" 


class MonkeyPollAdmin(admin.ModelAdmin):                         # Вместо метода __str__
    list_display = ['type_monkey','name','gender', 'diet', 'date']
    list_editable = ['name']
    ordering = ['type_monkey', '-gender']
    list_per_page = 10


admin.site.register(MonkeyPoll, MonkeyPollAdmin)




class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    poll = models.BooleanField(default=False, blank=True, verbose_name = "Опрос пройден")
    poll_id = models.IntegerField(null=True, blank=True, verbose_name = "ID ответа")
    
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()