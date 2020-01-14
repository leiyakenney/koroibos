const OlympianStats = require('../models/olympianStats.js');
const olympianStats = new OlympianStats();

class OlympianStatsHelper {

  async olympianStatsResponse() {
    const data = await olympianStats.getOlympianStats()
    const formattedData = {}
    formattedData["olympian_stats"] = data
    return formattedData
  }
}

module.exports = OlympianStatsHelper
