##Welcome to Endless Frontier Artifacts Builder !

This part is the backend, it uses Python with Django and Django REST framework.

Feel free to report bugs !

Require python >= 3.6

Set of commands to make it run

```console
# Building up virtual environnement and getting libraires
virtualenv venv -p python3 --no-site-package
. venv/bin/activate
pip install -r requirements.txt

# Create local_settings
touch EFArtifacts/local_settings.py
echo "SECRET_KEY='HeyImASecretKey'" > text.txt

# Then setup the database
python manage.py makemigrations
python manage.py migrate

# Create user and start server
python manage.py createsuperuser
python manage.py runserver
```

As simple as this, you'll have to add data by yourself to make it work ;)
