# <center>Saltiest Hacker News Trolls Backend</center>
Read me will be updated occasionally

Deployed heroku backend: [Here](https://hacker-news-troll.herokuapp.com/api)

#### Description

Build an app that uses Hacker News comment data to rank commenters based on comment sentiment (saltiness/negativity).

#### MVP

App rates and ranks hacker news commenters by negativity of comment sentiment (limited to commenters who have made x number of posts). Allows users to search by username to view comments and sentiment levels of specific users.


## A Note About Authenticated Routes

#### - Routes that require authentication(i.e. needs a token sent in the header) will be labeled as such with the '- AUTH REQUIRED' tag in this README
####  - All tokens that are sent in the request header MUST CONTAIN a header type of 'Bearer' before the token - If the Bearer is not supplied your request will fail with a status 400 and a message telling you that it was unable to verify the authorization header type. Please also note that there must be a space between the keyword 'Bearer' and the following token.
##### Example of correct Authorization header:
```
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMiIsImlhdCI6MTU3NzUwNjc2MiwiZXhwIjoxNTc3NTkzMTYyfQ.VFSJTA8TWKyoS84HQXrsM1xe07Cj-b83aRql8NNGEvg'
```


## Authentication Endpoints

### /api/register - POST

#### Expected data in request body:
```
{
    "username": "exampleUser",
    "password": "examplePassword"
}
```

#### Expected return data:
```
{
    "created_user": {
        "id": 1,
        "username": "exampleUser"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMiIsImlhdCI6MTU3NzUwNjc2MiwiZXhwIjoxNTc3NTkzMTYyfQ.VFSJTA8TWKyoS84HQXrsM1xe07Cj-b83aRql8NNGEvg"
}
```


### /api/login - POST

#### Expected data in request body:
```
{
    "username": "exampleUser",
    "password": "examplePassword"
}
```

#### Expected return data:

```
{
    "user": {
        "id": 1,
        "username": "exampleUser"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNTc3NTAxMDIyLCJleHAiOjE1Nzc1ODc0MjJ9.6nFAmcA0CQfXqeRd1c4Pw1EY8AYmCRL99TU3olX9W_U"
}
```

### /api/users GET - AUTH REQUIRED

#### Expected Headers:
```
Content-Type: application/json
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNTc3NTAxMDIyLCJleHAiOjE1Nzc1ODc0MjJ9.6nFAmcA0CQfXqeRd1c4Pw1EY8AYmCRL99TU3olX9W_U'
```

#### Expected Return Data
```
[
    {
        "id": 1,
        "username": "exampleUser"
    },
    {
        "id": 2,
        "username": "exampleUser2"
    },
    {
        "id": 3,
        "username": "exampleUser3"
    },
]
```


### /api/users PUT - AUTH REQUIRED

#### Expected Headers:
```
Content-Type: application/json
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNTc3NTAxMDIyLCJleHAiOjE1Nzc1ODc0MjJ9.6nFAmcA0CQfXqeRd1c4Pw1EY8AYmCRL99TU3olX9W_U'
```

#### Expected Request Body:
```
{
    "username": "updatedExampleUser"
}
```

#### Expected Return Data:
```
{
    "id": 1,
    "username": "updatedExampleUser"
}
```

### /api/users DELETE - AUTH REQUIRED

#### Expected Headers:
```
Content-Type: application/json
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNTc3NTAxMDIyLCJleHAiOjE1Nzc1ODc0MjJ9.6nFAmcA0CQfXqeRd1c4Pw1EY8AYmCRL99TU3olX9W_U'
```

#### Expected Return Data:
```
{
    "message": "User has been deleted successfully.",
    "users": [
    {
        "id": 2,
        "username": "exampleUser2"
    },
    {
        "id": 3,
        "username": "exampleUser3"
    },
    ]
}
```