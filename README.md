# <center>Saltiest Hacker News Trolls Backend</center>
Read me will be updated occasionally

Deployed heroku backend: [Here](https://hacker-news-troll.herokuapp.com/api)

#### Description

Build an app that uses Hacker News comment data to rank commenters based on comment sentiment (saltiness/negativity).

#### MVP

App rates and ranks hacker news commenters by negativity of comment sentiment (limited to commenters who have made x number of posts). Allows users to search by username to view comments and sentiment levels of specific users.


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

