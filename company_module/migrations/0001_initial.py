# Generated by Django 4.1.6 on 2023-02-14 00:13

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Company_name', models.CharField(max_length=30, null=True)),
                ('Employers_Website', models.URLField(blank=True, null=True)),
                ('Company_logo', models.ImageField(blank=True, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Visiting_company_record',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visiting_date', models.DateField()),
                ('HRName', models.CharField(blank=True, max_length=400, null=True)),
                ('Position', models.CharField(blank=True, max_length=40, null=True)),
                ('MinLpa_offered', models.DecimalField(decimal_places=2, max_digits=4, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(99.99)])),
                ('MaxLpa_offered', models.DecimalField(decimal_places=2, max_digits=4, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(99.99)])),
                ('Description', models.TextField(blank=True, null=True)),
                ('Pdf', models.FileField(blank=True, null=True, upload_to='')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Visiting_record', to='company_module.company')),
            ],
        ),
    ]
