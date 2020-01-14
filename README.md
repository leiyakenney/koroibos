README

# Koroibos

## Introduction
Koroibos is an Express NodeJS RESTful API that returns detailed information about the 2016 Summer Olympics events and participants. By making API requests, a user can access various information about events, participants, and medalists in the 2016 Olympic Games.

## Local Setup
1. You will need Node to run this program - if you need to install it, [click here](https://nodejs.org/en/)!
1. Fork and clone down this repo
1. Install all dependences by navigating to the root directory in your terminal and running `npm install`
1. Install module `csv-parser`: `npm i -s csv-parser`
1. Run `psql` in your terminal and run `CREATE DATABASE olympians_dev;` to create your PostgreSQL database
1. Run the following command in `psql` to import the Olympians' data into the database
  ```
  psql
  \c olympians_dev
  COPY olympians(name, sex, age, height, weight, team, games, sport, event, medal) FROM 'olympic_data_2016_csv_full_path' delimiter ',' csv HEADER NULL AS 'NULL';

  COPY events(sport, event) FROM 'olympic_event_data_2016_csv_full_path' delimiter ',' csv NULL AS 'NULL';
  ```
7. Run table migrations with `knex migrate:latest`

## Testing
- To test this app, run `npm run test`

## Heroku Production Link
- This app and its production endpoints can be accessed at https://koroibos-lk.herokuapp.com/
- All endpoints have links to their production endpoints (above link takes you to the base repo)

## Endpoints
- To access locally: `npm start`, navigate to `http://localhost:3000/`

### Endpoint 1: GET All Olympians
Returns all Olympians from the database, including their: id, name, team, age, sport, and total medals won.

[See it in production!](https://koroibos-lk.herokuapp.com/api/v1/olympians)
```
GET /api/v1/olympians
```
- Example successful response:
```
status: 200
{
  "olympians":
    [
      {
        "name": "Maha Abdalsalam",
        "team": "Egypt",
        "age": 18,
        "sport": "Diving",
        "total_medals_won": 0
      },
      {
        "name": "Ahmad Abughaush",
        "team": "Jordan",
        "age": 20,
        "sport": "Taekwondo",
        "total_medals_won": 1
      },
      {...}
    ]
}
```

### Endpoint 2: GET Youngest Olympian
Returns the youngest Olympian.

[See it in production!](https://koroibos-lk.herokuapp.com/api/v1/olympians?age=youngest)
```
GET /api/v1/olympians?age=youngest
```
- Example successful response:
```
status: 200

{
  [
    {
      "name": "Ana Iulia Dascl",
      "team": "Romania",
      "age": 13,
      "sport": "Swimming"
      "total_medals_won": 0
    }
  ]
}
```

### Endpoint 3: GET Oldest Olympian
Returns the oldest Olympian.

[See it in production!](https://koroibos-lk.herokuapp.com/api/v1/olympians?age=oldest)
```
GET /api/v1/olympians?age=oldest
```
- Example successful response:
```
status: 200
{
  [
    {
      "name": "Julie Brougham",
      "team": "New Zealand",
      "age": 62,
      "sport": "Equestrianism"
      "total_medals_won": 0
    }
  ]
}
```

### Endpoint 4: GET Olympian Stats
Returns various statistics for all Olympians together: total competing, average age, average weight (female and male) in kg.

[See it in production!](https://koroibos-lk.herokuapp.com/api/v1/olympian_stats)
```
GET /api/v1/olympian_stats
```
- Example successful response:
```
status: 200
{
  "olympian_stats": {
    "total_competing_olympians": 3120
    "average_weight:" {
      "unit": "kg",
      "male_olympians": 75.4,
      "female_olympians": 70.2
    }
    "average_age:" 26.2
  }
}
```

### Endpoint 5: GET api/v1/events
Returns all events at 2016 Olympics by sport.

[See it in production!](https://koroibos-lk.herokuapp.com/api/v1/events)
```
  GET /api/v1/events
```
- Example successful response:
```
status: 200
{
  "events":
    [
      {
        "sport": "Archery",
        "events": [
          "Archery Men's Individual",
          "Archery Men's Team",
          "Archery Women's Individual",
          "Archery Women's Team"
        ]
      },
      {
        "sport": "Badminton",
        "events": [
          "Badminton Men's Doubles",
          "Badminton Men's Singles",
          "Badminton Women's Doubles",
          "Badminton Women's Singles",
          "Badminton Mixed Doubles"
        ]
      },
      {...}
    ]
}
```

### User Story #6: GET api/v1/events/:id/medalists
Returns all medalists for an event by event ID.

[See it in production!](https://koroibos-lk.herokuapp.com/api/v1/events/1/medalists)
```
GET /api/v1/events/:id/medalists
```
- Example successful response:
```
status: 200
{
  "event": "Badminton Mixed Doubles",
  "medalists": [
      {
        "name": "Tontowi Ahmad",
        "team": "Indonesia-1",
        "age": 29,
        "medal": "Gold"
      },
      {
        "name": "Chan Peng Soon",
        "team": "Malaysia",
        "age": 28,
        "medal": "Silver"
      }
    ]
}
```
- Example unsuccessful response (incorrect event ID entered):
```
GET /api/v1/events/incorrect/medalists
```
```
status: 404

    {
        "error": "That event doesn't exist. Please try again!"
    }
```

## Agile Project Board
- The agile project board can be accessed [here](https://github.com/leiyakenney/koroibos/projects/1)

## Schema
![Schema diagram with two tables: olympians and events](https://user-images.githubusercontent.com/45922590/72389628-b85ff900-3720-11ea-9b9d-fbbc7077a6fb.png)

## Known Issues
- Heroku psql databse will expire after a set amount of time, leading to an `"error": {}` response or the below: 
```
error: {
name: "error",
length: 116,
severity: "FATAL",
code: "53300",
file: "miscinit.c",
line: "664",
routine: "InitializeSessionUserId",
}
```

If this happens: Try waiting about 30 seconds and trying a couple more times. If not: 

```
heroku run bash
knex migrate:rollback (until you are at base migration)
knex migrate:latest
```
```
heroku pg:psql
\copy olympians(name, sex, age, height,weight, team, games, sport, event, medal) from 'olympic_data_2016_csv_full_path' delimiter ',' csv HEADER null AS '';
\copy events(sport, event) from 'olympic_event_data_2016_csv_full_path' delimiter ',' csv null AS '';
exit
```

## How to Contribute
- Send a DM to [Leiya](https://github.com/leiyakenney) to see how you can contribute!

## Tech Stack
- Koroibos is a NodeJS application built with the Express framework
- Knex
- Jest for testing
- PostgreSQL database
- Production hosted on Heroku

## Contributors
Koroibos was written by [Leiya Kenney](https://github.com/leiyakenney) as a final Back End Mod 4 project at Turing School of Software and Design.
