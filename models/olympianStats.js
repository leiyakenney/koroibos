const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class OlympianStats {
  constructor() {
  }

  async getOlympianStats() {
    const formattedData = {}
    const totalOlympians = await database('olympians').select('name', 'age', 'team', 'weight', 'height').groupBy('name', 'age', 'team', 'weight', 'height')
    formattedData["total_competing_olympians"] = totalOlympians.length
  }
}

module.exports = OlympianStats
