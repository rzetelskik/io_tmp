# io_tmp

## Where to find the recent release?
See our app on [Heroku](https://adhoc-prod.herokuapp.com/).

## How to build and run the app locally?
### Prerequisites:
- Python 3.6.9 or higher installed locally.
- PostgreSQL installed locally.
- Having a Python virtual environment created ```virtualenv [-p full_path_to_python] directory_name``` with Django and React installed.
- Yarn available on path.
- Geodjango dependencies installed ```sudo apt-get install gdal-bin libgdal-dev python3-gdal```
- PostgreSQL with PostGIS extension as database. You can either install PostgreSQL locally and then add the PostGIS extension or better yet, you can use Docker to quickly create one using the image ```docker run --name=postgis -d -e POSTGRES_USER=user001 -e POSTGRES_PASS=123456789 -e POSTGRES_DBNAME=gis -p 5432:5432 kartoza/postgis:9.6-2.4```
- Redis database and redis-server installed. You can use Docker to quickly create one using redis:latest image ```docker run -p 6379:6379 --name some-redis -d redis redis-server --appendonly yes```

### Steps:
1. Source your virtualenv: ```source dirname/bin/activate```.
2. Clone the repository ```git clone git@github.com:rzetelskik/io_tmp.git``` and change to its directory ```cd io_tmp```.
3. Install the dependencies in your virtualenv: ```pip install -r requirements.txt```.
4. To build the react app: ```cd frontend/ && yarn install && yarn build && cd ..```.\
Now, to run the whole application simply run: ```python manage.py collectstatic --noinput && python manage.py migrate && python manage.py runserver```.\
The app should now be running at localhost:8000.

