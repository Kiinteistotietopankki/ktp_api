const axios = require('axios');

class MMLTulosteetService {
  constructor() {
    this.baseUrl = process.env.MML_TULOSTE_URL;
    this.auth = {
      username: process.env.MML_KIINTEISTO_NAME,
      password: process.env.MML_KIINTEISTO_PASSWORD,
    };
    this.userid = 'dev_no_auth'; // tai muu tarvittava arvo
  }

  async haeLainhuutotodistus(kohdetunnus) {
    return this._get(`/lainhuutotodistus/pdf`, kohdetunnus);
  }

  async haeLainhuutotodistusIlmanHenkilotietoja(kohdetunnus) {
    return this._get(`/lainhuutotodistus_ilman_henkilotietoja/pdf`, kohdetunnus);
  }

  async haeRasitustodistus(kohdetunnus) {
    return this._get(`/rasitustodistus/pdf`, kohdetunnus);
  }

  async haeRasitustodistusIlmanHenkilotietoja(kohdetunnus) {
    return this._get(`/rasitustodistus_ilman_henkilotietoja/pdf`, kohdetunnus);
  }

  async haeVuokraoikeustodistus(kohdetunnus) {
    return this._get(`/vuokraoikeustodistus/pdf`, kohdetunnus);
  }

  async haeVuokraoikeustodistusIlmanHenkilotietoja(kohdetunnus) {
    return this._get(`/vuokraoikeustodistus_ilman_henkilotietoja/pdf`, kohdetunnus);
  }

  async haeYhteystiedot(kohdetunnus) {
    return this._get(`/yhteystiedot/pdf`, kohdetunnus);
  }

  async _get(path, kohdetunnus) {
    const url = `${this.baseUrl}${path}`;
    try {
      const response = await axios.get(url, {
        params: { kohdetunnus },
        auth: this.auth,
        headers: { userid: this.userid },
        responseType: 'arraybuffer', // PDF data tulee binäärinä
      });
      return response.data; // Buffer-tyyppinen PDF-data
    } catch (error) {
      console.error(`Virhe haettaessa ${path}:`, error.message);
      throw error;
    }
  }
}

module.exports = MMLTulosteetService;
