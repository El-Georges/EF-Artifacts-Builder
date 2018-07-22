# Generated by Django 2.0.7 on 2018-07-21 14:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('artifacts', '0016_auto_20180721_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='set',
            name='set_bonus_1_race',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='set_bonus_1', to='artifacts.Race'),
        ),
        migrations.AlterField(
            model_name='set',
            name='set_bonus_2_race',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='set_bonus_2', to='artifacts.Race'),
        ),
    ]
