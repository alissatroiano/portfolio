# Generated by Django 4.0.4 on 2022-08-10 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0006_auto_20211027_1820'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='repository',
            field=models.URLField(blank=True, max_length=1024, null=True),
        ),
    ]
