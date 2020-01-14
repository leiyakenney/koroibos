const Events = require('../models/events.js');
const events = new Events();

class EventsHelper {

  async createEventsResponse() {
    const data = await events.getAllEvents()
    const formattedData = {}
    formattedData["events"] = data
    return formattedData
  }
}

module.exports = EventsHelper
