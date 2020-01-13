var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test olympians path for get all request', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade');

    await database('olympians').insert([
      {name: 'Denis Mikhaylovich Ablyazin', sex: 'M', age: '24', height: '161', weight: '62', team: 'Russia', games: '2016 Summer,Gymnastics', sport: "Gymnastics", event: "Men's Horse Vault", medal: "Silver"},
      {name: 'Denis Mikhaylovich Ablyazin', sex: 'M', age: '24', height: '161', weight: '62', team: 'Russia', games: '2016 Summer,Gymnastics', sport: "Gymnastics", event: "Men's Floor", medal: "Bronze"},
      {name: 'Elena Maria', sex: 'M', age: '24', height: '161', weight: '62', team: 'Brazil', games: '2016 Summer,Gymnastics', sport: "Running", event: "400m", medal: null},
      {name: 'Gabriel Domenshev', sex: 'M', age: '24', height: '161', weight: '62', team: 'Romania', games: '2016 Summer,Gymnastics', sport: "Swimming", event: "400m", medal: null },
      {name: 'Benji Levi', sex: 'M', age: '24', height: '161', weight: '62', team: 'Israel', games: '2016 Summer,Gymnastics', sport: "Soccer", event: "Gold Medal Match", medal: "Gold"}
    ]);
  });

  afterEach(() => {
    database.raw('truncate table olympians cascade');
  });

  describe('test olympians GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/olympians");
        console.log(response.body)

      expect(response.statusCode).toBe(200);

      expect(response.body["olympians"].length).toBe(4);
      expect(response.body).toHaveProperty('olympians');
      expect(response.body["olympians"][0]).toHaveProperty('name');
      expect(response.body["olympians"][0]).toHaveProperty('team');
      expect(response.body["olympians"][0]).toHaveProperty('age');
      expect(response.body["olympians"][0]).toHaveProperty('sport');
      expect(response.body["olympians"][0]).toHaveProperty('total_medals_won');
    });
  });
});
