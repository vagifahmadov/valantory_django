from django_cron import CronJobBase, Schedule
import datetime


class MyJob(CronJobBase):
    RUN_EVERY_MINS = 1  # every 1 minute

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'myapp.my_job'  # a unique code

    def do(self):
        print("Cron job is running...")
        # Your logic here


