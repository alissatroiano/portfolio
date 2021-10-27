# Generated by Django 3.2.8 on 2021-10-27 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0005_project_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='image',
        ),
        migrations.AddField(
            model_name='project',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='projects'),
        ),
        migrations.AlterField(
            model_name='project',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='media'),
        ),
    ]
