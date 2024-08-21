from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.files.storage import storages
def select_storage():
    return storages["mystorage"]

class Test(models.Model):
    id = models.IntegerField(primary_key=True)
    description = models.TextField(blank=True)
    date_due = models.DateTimeField(null=True,blank=True)
    name = models.CharField(max_length=100,unique=False)
    submitter = models.CharField(max_length=100,unique=False)
    file = models.FileField(storage=select_storage,null=True)
    max_points = models.IntegerField(null=True,blank=True)
    student_points = models.IntegerField(null=True,blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['date_due']
        db_table = "test"
# Create your models here.
