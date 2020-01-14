const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Events {
  constructor() {
  }

  async getAllEvents() {
    const sports = await database('events').select('sport').groupBy('sport')

    await Promise.all(sports.map(async (sport) => {
      const events = await database('events').where('sport', sport.sport).select('event').groupBy('event')

      sport["events"] = []

      await Promise.all(events.map(async (event) => {
        sport["events"].push(event.event)
      }));
    }));
    return sports
  }
}

module.exports = Events
