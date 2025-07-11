

  //https://khr.maanmittauslaitos.fi/tilastopalvelu/rest/1.1/indicators/2313
  //https://khr.maanmittauslaitos.fi/tilastopalvelu/rest/1.1/categories/Kunta/indicators/2313/data?&years=2024&years=2023
  //https://khr.maanmittauslaitos.fi/tilastopalvelu/rest/1.1/categories/kunta/regions

const axios = require('axios');

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

    const kunta = regions.find(r => r.name.toLowerCase() === kuntaName.toLowerCase());
    if (!kunta) {
      throw new Error(`Kunta with name "${kuntaName}" not found.`);
    }
    return kunta.code;
  }

  // Get indicator data for kunta category and given indicator, years
  async getIndicatorDataForKunta(indicatorId, years = []) {
    try {
      const yearsQuery = years.map(y => `years=${encodeURIComponent(y)}`).join('&');
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
      // Step 1: Get the kunta code for the given name
      const kuntaCode = await this.getKuntaCodeByName(kuntaName);

      // Step 2: Get the indicator data for all kunta regions and given years
      const data = await this.getIndicatorDataForKunta(indicatorId, years);

      // Step 3: Filter the data for entries matching the kunta code
      const filteredData = data.filter(entry => entry.region === kuntaCode);

      if (filteredData.length === 0) {
        throw new Error(`No indicator data found for kunta "${kuntaName}" with code ${kuntaCode}`);
      }

      // Return the filtered data (could have multiple years)
      // You can customize this to return single value, or an object with year-value pairs, etc.
      return filteredData;

    } catch (error) {
      console.error('Error getting indicator value by kunta name:', error.message);
      throw error;
    }
  }
}

module.exports = MMLTilastotService;
