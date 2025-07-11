from django.db import models


# Create your models here.
class UserData(models.Model):
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    patronymic = models.CharField(max_length=50, null=True, blank=True)
    pin = models.CharField(max_length=50, null=True, blank=True)
    branch_name = models.CharField(max_length=50, default=None)
    photo = models.CharField(max_length=255, null=True, blank=True)
    branch_id = models.IntegerField(default=0, null=True, blank=True)
    folder_url = models.CharField(max_length=20, null=True, blank=True)
    uid = models.IntegerField(default=0, null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['uid'])
        ]


class Logs(models.Model):
    date_run = models.DateTimeField(null=False, blank=True)
    description = models.CharField(max_length=255, null=True, blank=True)
    error = models.CharField(max_length=255, null=True, blank=True)
