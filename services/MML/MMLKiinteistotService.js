const axios = require('axios');

class MMLKiinteistotService {
  constructor() {
    this.baseUrl = process.env.MML_KIINTEISTO_URL;
    this.auth = {
      username: process.env.MML_KIINTEISTO_NAME,
      password: process.env.MML_KIINTEISTO_PASSWORD,
    };
    this.userid = 'dev_no_auth';
  }

  //Perustieto

  async haePerustiedot(kohdetunnus) {
    return this._get('/perustiedot/kohde/xml', kohdetunnus);
  }

    async haeRekisteriyksikkoa(kohdetunnus) {
    return this._get('/perustiedot/rekisteriyksikko/kohde/xml', kohdetunnus);
  }

  async haeMaara_alaa(kohdetunnus) {
    return this._get('/perustiedot/maaraala/kohde/xml', kohdetunnus);
  }

  async haeLaitosta(kohdetunnus) {
    return this._get('/perustiedot/laitos/kohde/xml', kohdetunnus);
  }

  async haeYhteystiedot(kohdetunnus) {
    return this._get('/yhteystiedot/xml', kohdetunnus);
  }

  // Lainhuutotiedot

  async haeLainhuutotiedotIlmanhenkilotietoja(kohdetunnus) {
    return this._get('/lainhuutotiedot_ilman_henkilotietoja/xml', kohdetunnus);
  }

  async haeLainhuutotiedotIlmanhenkilotunnuksia(kohdetunnus) {
    return this._get('/lainhuutotiedot_ilman_henkilotunnusta/xml', kohdetunnus);
  }

  async haeLainhuutotiedotHenkilotunnuksilla(kohdetunnus) {
    return this._get('/lainhuutotiedot/xml', kohdetunnus);
  }

  // Rasitustiedot

  async haeRasitustiedotIlmanhenkilotietoja(kohdetunnus) {
    return this._get('/rasitustiedot_ilman_henkilotietoja/xml', kohdetunnus);
  }

  async haeRasitustiedotIlmanhenkilotunnuksia(kohdetunnus) {
    return this._get('/rasitustiedot_ilman_henkilotunnusta/xml', kohdetunnus);
  }

  async haeRasitustiedotHenkilotunnuksilla(kohdetunnus) {
    return this._get('/rasitustiedot/xml', kohdetunnus);
  }


  // Vuokraoikeustiedot
  async haeVuokraoikeustiedotIlmanhenkilotunnuksia(kohdetunnus) {
    return this._get('/vuokraoikeustiedot_ilman_henkilotunnusta/xml', kohdetunnus);
  }

  async haeVuokraoikeustiedotIlmanhenkilotietoja(kohdetunnus) {
    return this._get('/vuokraoikeustiedot_ilman_henkilotietoja/xml', kohdetunnus);
  }

  async haeVuokraoikeustiedotHenkilotunnuksilla(kohdetunnus) {
    return this._get('/vuokraoikeustiedot/xml', kohdetunnus);
  }



  async _get(path, kohdetunnus) {
    const url = `${this.baseUrl}${path}`;
    try {
      const response = await axios.get(url, {
        params: { kohdetunnus },
        auth: this.auth,
        headers: {
          userid: this.userid,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Virhe haettaessa ${path}:`, error.message);
      throw error;
    }
  }
}

module.exports = MMLKiinteistotService;
