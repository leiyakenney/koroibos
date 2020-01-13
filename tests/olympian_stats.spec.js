var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test olympians_stats path for get request', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade');

    await database('olympians').insert([
      {name: 'Chloe Esposito', sex: 'F', age: 24, height: 168, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Modern Pentathlon', event: "Modern Pentathlon Women's Individual", medal: 'Gold'},
      {name: 'Mara del Rosario Espinoza Espinoza', sex: 'F', age: 28, height: 173, weight: 70, team: 'Mexico', games: '2016 Summer', sport: 'Taekwondo', event: "Taekwondo Women's Heavyweight", medal: 'Silver'},
      {name: 'Magdalena "Magda" Eriksson', sex: 'F', age: 22, height: 172, weight: 66, team: 'Sweden', games: '2016 Summer', sport: 'Football', event: "Football Women's Football", medal: 'Silver'},
      {name: 'Saturday Keigo Erimuya', sex: 'M', age: 18, height: 171, weight: null, team: 'Nigeria', games: '2016 Summer', sport: 'Football', event: "Football Men's Football", medal: 'Bronze'},
      {name: 'Hakan Ereker', sex: 'M', age: 22, height: 168, weight: 60, team: 'Qatar', games: '2016 Summer', sport: 'Boxing', event: "Boxing Men's Lightweight", medal: null},
      {name: 'Anna Espar Llaquet', sex: 'F', age: 23, height: 180, weight: 66, team: 'Spain', games: '2016 Summer', sport: 'Water Polo', event: "Water Polo Women's Water Polo", medal: null}
    ]);
  });

  afterEach(() => {
    database.raw('truncate table olympians cascade');
  });

  describe('A user', () => {
    it('can get stats for all Olympians', async () => {
      const response = await request(app)
        .get("/api/v1/olympian_stats")

      expect(response.statusCode).toBe(200);

      console.log(response.body)
    })
  })
});
