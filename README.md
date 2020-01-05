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


### /api/comments GET - AUTH REQUIRED

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
        "troll_username": "TrollMaster",
        "comment_toxicity": 0.1,
        "comment": "Never gonna give you up, never gonna let you down."
    },
    {
        "id": 4,
        "troll_username": "RollyTrolly",
        "comment_toxicity": 0.5,
        "comment": "Never gonna give you up, never gonna let you down."
    },
    {
       "id": 5,
        "troll_username": "RollyTrolly",
        "comment_toxicity": 0.9,
        "comment": "Never gonna give you up, never gonna let you down."
    },
]
```


### /api/comments POST - AUTH REQUIRED

#### Expected Headers:
```
Content-Type: application/json
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNTc3NTAxMDIyLCJleHAiOjE1Nzc1ODc0MjJ9.6nFAmcA0CQfXqeRd1c4Pw1EY8AYmCRL99TU3olX9W_U'
```

#### Expected Request Body:
```
{
	"troll_username": "Batman",
	"comment_toxicity": 0.4,
	"comment": "He has the power to take out the entire human race and if we believe there is even a one percent chance that he is our enemy, we have to take it as an absolute certainty!"
}
```

#### Expected Return Data
```
[
    {
        "id": 1,
        "troll_username": "TrollMaster",
        "comment_toxicity": 0.1,
        "comment": "Never gonna give you up, never gonna let you down."
    },
    {
        "id": 4,
        "troll_username": "RollyTrolly",
        "comment_toxicity": 0.5,
        "comment": "Never gonna give you up, never gonna let you down."
    },
    {
       "id": 5,
        "troll_username": "RollyTrolly",
        "comment_toxicity": 0.9,
        "comment": "Never gonna give you up, never gonna let you down."
    },
    {
    "id": 6
	"troll_username": "Batman",
	"comment_toxicity": 0.4,
	"comment": "He has the power to take out the entire human race and if we believe there is even a one percent chance that he is our enemy, we have to take it as an absolute certainty!"
    }
]
```


### /api/comments DELETE - AUTH REQUIRED

#### Expected Headers:
```
Content-Type: application/json
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyIiwiaWF0IjoxNTc3NTAxMDIyLCJleHAiOjE1Nzc1ODc0MjJ9.6nFAmcA0CQfXqeRd1c4Pw1EY8AYmCRL99TU3olX9W_U'
```

#### Expected Request Body:
```
{
	"id": 6
}
```

#### Expected Return Data
```
[
    {
        "id": 1,
        "troll_username": "TrollMaster",
        "comment_toxicity": 0.1,
        "comment": "Never gonna give you up, never gonna let you down."
    },
    {
        "id": 4,
        "troll_username": "RollyTrolly",
        "comment_toxicity": 0.5,
        "comment": "Never gonna give you up, never gonna let you down."
    },
    {
       "id": 5,
        "troll_username": "RollyTrolly",
        "comment_toxicity": 0.9,
        "comment": "Never gonna give you up, never gonna let you down."
    }
]
```