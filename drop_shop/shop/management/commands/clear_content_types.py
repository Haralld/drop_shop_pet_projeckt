from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType
from django.db import IntegrityError

class Command(BaseCommand):
    help = 'Clear content types before loading data'

    def handle(self, *args, **options):
        try:
            ContentType.objects.all().delete()
        except IntegrityError:
            self.stdout.write(self.style.ERROR('IntegrityError occurred while clearing content types'))
        else:
            self.stdout.write(self.style.SUCCESS('Successfully cleared content types'))
