# Generated by Django 2.0.7 on 2018-07-21 00:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artifacts', '0011_auto_20180721_0056'),
    ]

    operations = [
        migrations.AlterField(
            model_name='set',
            name='set_bonus_1_value',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='set',
            name='set_bonus_2_value',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
