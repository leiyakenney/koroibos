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

    var totalAge = 0
    await Promise.all(totalOlympians.map(async (olympian) => {
      const olyAge = parseInt(olympian.age)
      totalAge += olyAge
    }));

    var totalOlympiansCount = totalOlympians.length
    var averageAge = (totalAge / totalOlympiansCount)
    formattedData["average_age:"] = averageAge

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

    var femalesWeight = 0
    const femaleOlympians = await database('olympians').where('sex', 'F').whereNotNull('weight').select('name', 'age', 'team', 'weight', 'height').groupBy('name', 'age', 'team', 'weight', 'height')
    await Promise.all(femaleOlympians.map(async (olympian) => {
      const femaleKg = parseInt(olympian.weight)
      femalesWeight += femaleKg
    }));

    var totalFemaleOlympians = femaleOlympians.length
    var avgFemaleWeight = (femalesWeight / totalFemaleOlympians)
    formattedData["average_weight:"]["female_olympians"] = avgFemaleWeight

    console.log(formattedData)
    return formattedData
  }
}

module.exports = OlympianStats
