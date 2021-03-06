from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Board
from django.conf import settings
from django.core.mail.message import EmailMessage

import threading
from threading import Thread

FROM_EMAIL = settings.EMAIL_HOST_USER


class EamilThread(threading.Thread):
    def __init__(self, subject, message, to):
        self.subject = subject
        self.to = to
        self.message = message
        threading.Thread.__init__(self)

    def run(self):
        EmailMessage(self.subject, self.message,
                     FROM_EMAIL, self.to).send()


@receiver(post_save, sender=Board)
def send_email(sender, **kwargs):
    if not settings.DEBUG:
        board = Board.objects.get(id=kwargs['instance'].id)
        subject = board.title
        message = board.explanation
        to = [FROM_EMAIL, board.email]
        EamilThread(subject, message, to).start()
    return
