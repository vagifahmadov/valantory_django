from django_cron import CronJobBase, Schedule
import datetime


class MyCronJob(CronJobBase):
    RUN_EVERY_MINS = 1
    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'myapp.my_cron_job'

    def do(self):
        with open("cron_log.txt", "a") as f:
            f.write(f"[{datetime.datetime.now()}] Cron çalıştı!\n")
