# Generated by Django 3.1.6 on 2021-10-24 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('submitter', models.CharField(max_length=100)),
                ('date_due', models.DateTimeField(blank=True, null=True)),
                ('max_points', models.IntegerField(blank=True, null=True)),
                ('student_points', models.IntegerField(blank=True, null=True)),
                ('description', models.TextField(max_length=100)),
                ('file', models.FileField(blank=True, null=True, upload_to='assignments/')),
            ],
            options={
                'db_table': 'assignment',
                'ordering': ['date_due'],
            },
        ),
    ]
