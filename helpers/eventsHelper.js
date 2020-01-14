const Events = require('../models/events.js');
const events = new Events();

class EventsHelper {

  async createEventsResponse() {
    const data = await events.getAllEvents()
    const formattedData = {}
    formattedData["events"] = data
    return formattedData
  };

  async createMedalistsResponse(id) {
    const data = await events.getMedalists(id)
    console.log(data)
    return data
  };
}

module.exports = EventsHelper
