from django.urls import path
from .views import santhosh,get_tasks,delete,add_task
urlpatterns =[
    path('',santhosh),
    path('get_tasks/',get_tasks),
    path('delete_task/',delete),
    path('add_task/',add_task),
]