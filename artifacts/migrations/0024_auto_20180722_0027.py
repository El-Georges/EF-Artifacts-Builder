# Generated by Django 2.0.7 on 2018-07-22 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artifacts', '0023_auto_20180722_0025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='set',
            name='set_bonus_1_value',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='set',
            name='set_bonus_2_value',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='set',
            name='set_bonus_3_value',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='set',
            name='set_bonus_4_value',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='set',
            name='set_bonus_5_value',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='set',
            name='set_bonus_6_value',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
