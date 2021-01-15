import atexit
import time

from apscheduler.schedulers.background import BackgroundScheduler

def print_date_time():
    print(time.strftime("%A, %d. %B %Y %I:%M:%S %p"))

def setup_recurring_function(seconds):
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=print_date_time, trigger="interval", seconds=seconds)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
