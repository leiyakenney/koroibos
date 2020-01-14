var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const OlympiansHelper = require('../../../helpers/olympiansHelper.js');
const olympiansHelper = new OlympiansHelper();

router.get('/', async function (request, response) {
  // if youngest:
  if (request.query.age === 'youngest') {
    await olympiansHelper.createYoungestResponse()
    .then((youngestOlympian) => {
       response.status(200).json({youngestOlympian});
     })
     .catch((error) => {
       return response.status(500).json({ error });
     });
    }
  // if oldest:
  else if (request.query.age === 'oldest') {
    await olympiansHelper.createOldestResponse()
    .then((oldestOlympian) => {
       response.status(200).json({oldestOlympian});
     })
     .catch((error) => {
       return response.status(500).json({ error });
     });
  }
  // otherwise:
  else
    await olympiansHelper.createOlympiansResponse()
    .then((data) => {
       response.status(200).json(data);
     })
     .catch((error) => {
       return response.status(500).json({ error });
     });
});

module.exports = router;
