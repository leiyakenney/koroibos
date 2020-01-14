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

    formattedData["average_weight:"] = {}
    formattedData["average_weight:"]["unit"] = "kg"

    var malesWeight = 0
    const maleOlympians = await database('olympians').where('sex', 'M').whereNotNull('weight').select('name', 'age', 'team', 'weight', 'height').groupBy('name', 'age', 'team', 'weight', 'height')
    await Promise.all(maleOlympians.map(async (olympian) => {
      const maleKg = parseInt(olympian.weight)
      malesWeight += maleKg
    }));

    var totalMaleOlympians = maleOlympians.length
    var avgMaleWeight = (malesWeight / totalMaleOlympians)
    formattedData["average_weight:"]["male_olympians"] = avgMaleWeight

    console.log(formattedData)
    return formattedData
  }
}

module.exports = OlympianStats
