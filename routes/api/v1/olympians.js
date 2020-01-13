var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const OlympiansPresenter = require('../../../presenters/olympiansPresenter.js');
const olympiansPresenter = new OlympiansPresenter();

router.get('/', async function (request, response) {
  // if youngest:
  if (request.query.age === 'youngest') {
    await olympiansPresenter.createYoungestResponse()
    .then((youngestOlympian) => {
       response.status(200).json({youngestOlympian});
     })
     .catch((error) => {
       return response.status(500).json({ error });
     });
    }
  // if oldest:
  else if (request.query.age === 'oldest') {
    await olympiansPresenter.createOldestResponse()
    .then((oldestOlympian) => {
       response.status(200).json({oldestOlympian});
     })
     .catch((error) => {
       return response.status(500).json({ error });
     });
  }
  // otherwise:
  else
    await olympiansPresenter.createOlympiansResponse()
    .then((data) => {
       response.status(200).json(data);
     })
     .catch((error) => {
       return response.status(500).json({ error });
     });
});

module.exports = router;
