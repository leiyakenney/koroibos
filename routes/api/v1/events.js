var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const EventsHelper = require('../../../helpers/eventsHelper.js');
const eventsHelper = new EventsHelper();

router.get('/', async function (request, response) {
  await eventsHelper.createEventsResponse()
  .then((data) => {
    response.status(200).json(data);
  })
  .catch((error) => {
    return response.status(500).json({ error });
  })
});

router.get("/:id/medalists", async function (request, response) {
  try{
    await database('events').where('id', request.params.id).select('event')
  }
  catch(error) {
    return response.status(404).json({"error": "That event doesn't exist. Please try again!"});
  }
  await eventsHelper.createMedalistsResponse(request.params.id)
  .then((data) => {
    response.status(200).json(data);
  })
  .catch((error) => {
    return response.status(500).json({ error })
  });
});

module.exports = router;
