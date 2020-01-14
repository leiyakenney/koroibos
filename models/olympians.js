const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Olympians {
  constructor() {
  }

  async getAllOlympians() {
    const olympians = await database('olympians').select('name', 'age', 'team', 'sport').groupBy('name', 'age', 'team', 'sport')
    await Promise.all(olympians.map(async (olympian) => {
      const olympianMedals = await database('olympians').whereNotNull('medal').whereNot('medal', 'NULL').where('name', olympian.name).select('name').groupBy('name').count('name')

      if (olympianMedals.length == 0) {
         olympian['total_medals_won'] = '0'
      }
      if (olympianMedals.length != 0) {
         olympian['total_medals_won'] = olympianMedals[0].count
      }
    }));
    return olympians
  }

  async getYoungestOlympian() {
    const olympian = await database('olympians').select('name', 'age', 'team', 'sport').groupBy('name', 'age', 'team', 'sport').orderBy('age').first()
    const olympianMedals = await database('olympians').whereNotNull('medal').whereNot('medal', 'NULL').where('name', olympian.name).select('name').groupBy('name').count('name')

    if (olympianMedals.length == 0) {
       olympian['total_medals_won'] = '0'
    }
    if (olympianMedals.length != 0) {
       olympian['total_medals_won'] = olympianMedals[0].count
    }
    return olympian
  }

  async getOldestOlympian() {
    const olympian = await database('olympians').select('name', 'age', 'team', 'sport').groupBy('name', 'age', 'team', 'sport').orderBy('age', 'desc').first()
    const oldMedals = await database('olympians').whereNotNull('medal').whereNot('medal', 'NULL').where('name', olympian.name).select('name').groupBy('name').count('name')

    if (oldMedals.length == 0) {
       olympian['total_medals_won'] = '0'
    }
    if (oldMedals.length != 0) {
       olympian['total_medals_won'] = oldMedals[0].count
    }
    return olympian
  }
}

module.exports = Olympians
