# Generated by Django 5.0.7 on 2024-07-23 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0002_auto_20240722_0603'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transcript',
            name='transcript_text',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
