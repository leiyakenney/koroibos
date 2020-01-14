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
  };

  async getMedalists(id) {
    const formattedData = {}
    console.log(id)
    const eventData = await database('events').where('id', id).select('event')
    console.log(eventData)
    const eventMedalists = await database('olympians').where('event', eventData[0]["event"]).whereNotNull('medal').whereNot('medal', 'NULL').select('name', 'team', 'age', 'medal')
    formattedData["event"] = eventData[0]["event"]
    formattedData["medalists"] = eventMedalists
    return formattedData
  }
};

module.exports = Events
