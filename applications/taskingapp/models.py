from django.db import models
# Create your models here.
class Tasks(models.Model):
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=400)
    time=models.TimeField()
    date=models.DateField()
    priority=models.CharField(default="Normal",max_length=30)
    status=models.CharField(default="incomplete",max_length=20)