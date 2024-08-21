# Generated by Django 3.1.6 on 2021-10-24 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('message', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Thread',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('last_author', models.CharField(max_length=100)),
                ('last_description', models.TextField(max_length=200)),
                ('last_timestamp', models.DateTimeField(auto_now_add=True, null=True)),
                ('list_messages', models.ManyToManyField(blank=True, related_name='list_messages', to='message.Message')),
            ],
        ),
    ]
