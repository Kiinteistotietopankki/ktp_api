const axios = require('axios');

class MMLKiinteistotService {
  constructor() {
    this.baseUrl = process.env.MML_KIINTEISTO_URL;
    this.auth = {
      username: process.env.MML_KIINTEISTO_NAME,
      password: process.env.MML_KIINTEISTO_PASSWORD,
    };
    this.userid = 'dev_no_auth'
  }

  async haePerustiedot(kohdetunnus) {
    const url = `${this.baseUrl}/perustiedot/kohde/xml`;
    try {
      const response = await axios.get(url, {
        params: { kohdetunnus },
        auth: this.auth,
        headers: {
          userid: this.userid  // add your actual user ID here
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching perustiedot:', error.message);
      throw error;
    }
  }

  //  LAINHUUTOTIEDOT

  async haeLainhuutotiedotIlmanhenkilotietoja(kohdetunnus) {
    const url = `${this.baseUrl}/lainhuutotiedot_ilman_henkilotietoja/xml`;
    try {
      const response = await axios.get(url, {
        params: { kohdetunnus },
        auth: this.auth,
        headers: {
          userid: this.userid  // add your actual user ID here
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching perustiedot:', error.message);
      throw error;
    }
  }

  async haeLainhuutotiedotIlmanhenkilotunnuksia(kohdetunnus) {
    const url = `${this.baseUrl}/lainhuutotiedot_ilman_henkilotunnusta/xml`;
    try {
      const response = await axios.get(url, {
        params: { kohdetunnus },
        auth: this.auth,
        headers: {
          userid: this.userid  // add your actual user ID here
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching perustiedot:', error.message);
      throw error;
    }
  }


  // RASITUSTIEDOT 

    async haeRasitustiedotIlmanhenkilotietoja(kohdetunnus) {
    const url = `${this.baseUrl}/rasitustiedot_ilman_henkilotietoja/xml`;
    try {
      const response = await axios.get(url, {
        params: { kohdetunnus },
        auth: this.auth,
        headers: {
          userid: this.userid  // add your actual user ID here
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching perustiedot:', error.message);
      throw error;
    }
  }
  

}

module.exports = MMLKiinteistotService;
