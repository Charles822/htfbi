# Generated by Django 5.0.7 on 2024-07-26 06:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contents', '0003_alter_transcript_transcript_text'),
    ]

    operations = [
        migrations.CreateModel(
            name='Response',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('agent_response', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('transcript', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contents.transcript')),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contents.video')),
            ],
        ),
    ]
