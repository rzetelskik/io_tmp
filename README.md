# io_tmp

## Where to find the recent release?
See our app on [Heroku](https://adhoc-prod.herokuapp.com/).

## How to build and run the app locally?
### Prerequisites:
- Python 3.6.9 or higher installed locally.
- PostgreSQL installed locally.
- Having a Python virtual environment created ```virtualenv [-p full_path_to_python] directory_name``` with Django and React installed.
- Having yarn available on path.

### Steps:
1. Source your virtualenv: ```source dirname/bin/activate```.
2. Clone the repository ```git clone git@github.com:rzetelskik/io_tmp.git``` and change to its directory ```cd io_tmp```.
3. Install the dependencies in your virtualenv: ```pip install -r requirements.txt```.
4. To build the react app: ```cd frontend/ && yarn install && yarn build && cd ..```.\
Now, to run the whole application simply run: ```python manage.py runserver```.\
The app should now be running at localhost:8000.

