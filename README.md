README

# Koroibos

## Introduction
Koroibos is an Express NodeJS RESTful API that returns detailed information about the 2016 Summer Olympics events and participants.

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
  COPY olympians(name, sex, age, height, weight, team, games, sport, event, medal) FROM 'complete_file_path_of_csv_file' delimiter ',' csv NULL AS 'NULL';
  ```
1. Run table migrations with `knex migrate:latest`
1. Seed the database with `knex seed:run`

## Testing
- To test this app, run `npm test`

## Heroku Production Link
- This app and its production endpoints can be accessed at https://koroibos-lk.herokuapp.com/

## Endpoints
- To access locally: `npm start`, navigate to `http://localhost:5000/`

### Endpoint 1: Get All Olympians
Returns all Olympians from the database, including their: id, name, team, age, sport, and total medals won.
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

## Agile Project Board
- The agile project board can be accessed [here](https://github.com/leiyakenney/koroibos/projects/1)

## Known Issues
- None at this time

## How to Contribute
- TBD

## Tech Stack
- Koroibos is a NodeJS application built with the Express framework
- Knex
- Jest for testing
- PostgreSQL database
- Production hosted on Heroku

## Contributors
Koroibos was written by Leiya Kenney as a final Back End Mod 4 project at Turing School of Software and Design.
