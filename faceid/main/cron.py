from django_cron import CronJobBase, Schedule
from django.utils import timezone
from .models import Logs


class MyCronJob(CronJobBase):
    RUN_EVERY_MINS = 300
    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'Aze19051985#'

    def do(self):
        print("Runed", timezone.now())
        create_log = Logs.objects.create(date_run=timezone.now(), description="Runed", error=None)

