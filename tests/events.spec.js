var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test olympians path for get all request', () => {
  beforeEach(async () => {
    await database.raw('truncate table olympians cascade');
    await database.raw('truncate table events cascade');

    await database('olympians').insert([
      {name: 'Chloe Esposito', sex: 'F', age: 24, height: 168, weight: 55, team: 'Australia', games: '2016 Summer', sport: 'Modern Pentathlon', event: "Modern Pentathlon Women's Individual", medal: 'Gold'},
      {name: 'Mara del Rosario Espinoza Espinoza', sex: 'F', age: 28, height: 173, weight: 70, team: 'Mexico', games: '2016 Summer', sport: 'Taekwondo', event: "Taekwondo Women's Heavyweight", medal: 'Silver'},
      {name: 'Mara Sister', sex: 'F', age: 26, height: 171, weight: 67, team: 'Mexico', games: '2016 Summer', sport: 'Taekwondo', event: "Taekwondo Women's Heavyweight", medal: null},
      {name: 'Magdalena "Magda" Eriksson', sex: 'F', age: 22, height: 172, weight: 66, team: 'Sweden', games: '2016 Summer', sport: 'Football', event: "Football Women's Football", medal: 'Silver'},
      {name: 'Saturday Keigo Erimuya', sex: 'M', age: 18, height: 171, weight: null, team: 'Nigeria', games: '2016 Summer', sport: 'Football', event: "Football Men's Football", medal: 'Bronze'},
      {name: 'Hakan Ereker', sex: 'M', age: 22, height: 168, weight: 60, team: 'Qatar', games: '2016 Summer', sport: 'Boxing', event: "Boxing Men's Lightweight", medal: null},
      {name: 'Anna Espar Llaquet', sex: 'F', age: 23, height: 180, weight: 66, team: 'Spain', games: '2016 Summer', sport: 'Water Polo', event: "Water Polo Women's Water Polo", medal: null}
    ]);

    await database('events').insert([
      {id: 4, sport: "Rowing", event: "Rowing Women's Lightweight Double Sculls"},
      {id: 3, sport: "Rowing", event: "Rowing Women's Coxless Pairs"},
      {id: 2, sport: "Rowing", event: "Rowing Men's Double Sculls"},
      {id: 1, sport: "Taekwondo", event: "Taekwondo Women's Heavyweight"}
    ]);
  });

  afterEach(() => {
    database.raw('truncate table olympians cascade');
    database.raw('truncate table events cascade');
  });

  describe('A user', () => {
    it('can see the full list of events', async () => {
      const response = await request(app)
        .get("/api/v1/events");

      expect(response.statusCode).toBe(200);

      expect(response.body).toHaveProperty("events")
      expect(response.body["events"].length).toBe(2);
      expect(response.body["events"][0]["sport"]).toBe("Taekwondo");
      expect(response.body["events"][0]["events"][0]).toBe("Taekwondo Women's Heavyweight");
    });

    it('can get a list of medalists for a specific event', async () => {
      const response = await request(app)
      .get("/api/v1/events/1/medalists")

      expect(response.statusCode).toBe(200);
      console.log(response.body)
      expect(response.body).toHaveProperty("event")
      expect(response.body).toHaveProperty("medalists")
      expect(response.body["medalists"].length).toBe(1)
      expect(response.body["medalists"][0]["name"]).toBe("Mara del Rosario Espinoza Espinoza")
      expect(response.body["medalists"][0]["team"]).toBe("Mexico")
      expect(response.body["medalists"][0]["age"]).toBe("28")
      expect(response.body["medalists"][0]["medal"]).toBe("Silver")
    });

    it("cannot get information for an event that doesn't exist", async () => {
      const response = await request(app)
      .get("/api/v1/events/no/medalists")

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("That event doesn't exist. Please try again!")
    })
  });
});
