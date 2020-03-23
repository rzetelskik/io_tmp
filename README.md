# Na tym branchu znajduje się działający system logowania. Jak korzystać z API?

## Rejestracja użytkownika:
POST http://localhost:8000/api/account/register/

w body należy umieścić JSON w takim formacie:
```
{
    "username": "jane",
    "email": "janedoe@mail.mail",
    "first_name": "Jane",
    "last_name": "Doe",
    "password": "pass",
    "password2": "pass"
}
```


## Logowanie:
POST http://localhost:8000/api/account/login/

JSON:
```
{
    "username": "jane",
    "password": "pass"  
}
```


## Wylogowywanie:
POST http://localhost:8000/api/account/logout/

Tu nie umieszczamy nic w body.

W headerze, w Authorization należy umieścić string w postaci
```
Token 8ebf047befe5ef3a5366598dfab08ab993ee83cc7cbbafea1797f074b97bee82
```
Odpowiedni ciąg znaków otrzymujemy po zarejestrowaniu/zalogowaniu.


## Dane zalogowanego użytkownika:
GET http://localhost:8000/api/account/user/

Body puste. W headerze token.


## Zmiana hasła:
PUT http://localhost:8000/api/account/password-update/

W headerze token.

JSON:
```
{
    "password1": "old",
    "password2": "new",
    "password3": "new"
}
```
password1 to stare hasło, password2,3 to dwa razy powtórzone nowe hasło.



## Aktualizacja danych konta:
PUT http://localhost:8000/api/account/details-update/

W headerze token.

JSON:
```
{
    "username": "jane",                            // Uaktualnione dane
    "email": "janedoe@mail.mail",
    "first_name": "Jane",
    "last_name": "Doe",
    "password1": "pass",
}
```
password1 to aktualne hasło konta (nie ulega tu zmianie, jest podawane dla potwierdzenia).


____________
____________________
___________________________


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

