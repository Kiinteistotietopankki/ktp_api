const axios = require('axios');

class MMLKiinteistotService {
  constructor() {
    this.baseUrl = process.env.MML_KIINTEISTO_URL;
    this.auth = {
      username: process.env.MML_KIINTEISTO_NAME,
      password: process.env.MML_KIINTEISTÖ_PASSWORD,
    };
  }

  async haePerustiedot(kohdetunnus) {
    const url = `${this.baseUrl}/perustiedot/kohde/xml`;
    try {
      const response = await axios.get(url, {
        params: { kohdetunnus },
        auth: this.auth  // Basic Auth
      });
      return response.data; // XML string
    } catch (error) {
      console.error('Error fetching perustiedot:', error.message);
      throw error;
    }
  }

  

}

module.exports = MMLKiinteistotService;
