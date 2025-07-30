

  //https://khr.maanmittauslaitos.fi/tilastopalvelu/rest/1.1/indicators/2313
  //https://khr.maanmittauslaitos.fi/tilastopalvelu/rest/1.1/categories/Kunta/indicators/2313/data?&years=2024&years=2023
  //https://khr.maanmittauslaitos.fi/tilastopalvelu/rest/1.1/categories/kunta/regions
  //https://khr.maanmittauslaitos.fi/tilastopalvelu/rest/1.1/groups/23/indicators

const axios = require('axios');
const { toLower } = require('../../utils/utils.js');



class MMLTilastotService {
  constructor() {
    this.baseUrl = process.env.MML_TILASTO_URL || 'https://khr.maanmittauslaitos.fi/tilastopalvelu/rest/1.1';
    this.userid = 'dev_no_auth';
  }

  // Fetch all regions for category 'kunta'
  async getKuntaRegions() {
    try {
      const url = `${this.baseUrl}/categories/kunta/regions`;
      const response = await axios.get(url, {
        headers: { userid: this.userid }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching kunta regions:', error.message);
      throw error;
    }
  }

  // Get the code of a kunta by its name (case insensitive)
    async getKuntaCodeByName(kuntaName) {
        const regions = await this.getKuntaRegions();

        const kunta = regions.find(region => toLower(region.title?.fi) === toLower(kuntaName));

        if (!kunta) {
            throw new Error(`Kunta with name "${kuntaName}" not found.`);
        }

        return kunta.id;
    }

  // Get indicator data for kunta category and given indicator, years
    async getIndicatorDataForKunta(indicatorId, years = []) {
    try {
        // Force years to be an array if it isn't already
        const yearsArray = Array.isArray(years) ? years : [years];

        const yearsQuery = yearsArray.map(y => `years=${encodeURIComponent(y)}`).join('&');
        const url = `${this.baseUrl}/categories/kunta/indicators/${encodeURIComponent(indicatorId)}/data?${yearsQuery}`;
        const response = await axios.get(url, {
        headers: { userid: this.userid }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching indicator data:', error.message);
        throw error;
    }
    }

  // Given kunta name, indicator and years, get value(s) for that kunta
  async getIndicatorValueByKuntaName(indicatorId, kuntaName, years = []) {
    try {
      const kuntaCode = await this.getKuntaCodeByName(kuntaName);
      const data = await this.getIndicatorDataForKunta(indicatorId, years);

      const filteredData = data.filter(entry => entry.region === kuntaCode);

      if (filteredData.length === 0) {
        throw new Error(`No indicator data found for kunta "${kuntaName}" with code ${kuntaCode}`);
      }

      return filteredData;
    } catch (error) {
      console.error('Error getting indicator value by kunta name:', error.message);
      throw error;
    }
  }
}

module.exports = MMLTilastotService;
