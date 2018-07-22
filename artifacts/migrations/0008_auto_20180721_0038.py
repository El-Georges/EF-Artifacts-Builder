# Generated by Django 2.0.7 on 2018-07-21 00:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('artifacts', '0007_auto_20180721_0031'),
    ]

    operations = [
        migrations.AddField(
            model_name='artifact',
            name='artifact_bonus_1',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='bonus_1', to='artifacts.BonusAndRace'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='artifact_bonus_1_value',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='artifact',
            name='artifact_bonus_2',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='bonus_2', to='artifacts.BonusAndRace'),
        ),
        migrations.AddField(
            model_name='artifact',
            name='artifact_bonus_2_value',
            field=models.IntegerField(default=0),
        ),
    ]
