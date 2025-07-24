const axios = require('axios');

class MMLHuoneistotIJService {
  constructor() {
    this.baseUrl = process.env.MML_HUONEISTOT_IJ_URL;
    this.baseUrlVanha = process.env.MML_HUONEISTOT_IJ_VANHA_URL;
    this.x_isannoitsija = '34343-1';
    this.auth = {
      username: process.env.MML_KIINTEISTO_NAME,
      password: process.env.MML_KIINTEISTO_PASSWORD,
    };
    this.userid = 'dev_no_auth';
  }

  // --- HELPERS ---

  async _get(path, useOld = true) {
    const url = useOld
      ? `${this.baseUrlVanha}${path}`
      : `${this.baseUrl}${path}`;

    try {
      const response = await axios.get(url, {
        auth: this.auth,
        headers: {
          'x-isannoitsija': this.x_isannoitsija,
        },
        responseType: 'json',
      });
      return response.data;
    } catch (error) {
      console.error(`GET ${path} failed:`, error.message);
      throw error;
    }
  }

  async _post(path, data) {
    const url = `${this.baseUrlVanha}${path}`;
    try {
      const response = await axios.post(url, data, {
        auth: this.auth,
        headers: {
          'x-isannoitsija': this.x_isannoitsija,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`POST ${path} failed:`, error.message);
      throw error;
    }
  }

  async _put(path, data) {
    const url = `${this.baseUrlVanha}${path}`;
    try {
      const response = await axios.put(url, data, {
        auth: this.auth,
        headers: {
          'x-isannoitsija': this.x_isannoitsija,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`PUT ${path} failed:`, error.message);
      throw error;
    }
  }

  async _delete(path) {
    const url = `${this.baseUrlVanha}${path}`;
    try {
      const response = await axios.delete(url, {
        auth: this.auth,
        headers: {
          'x-isannoitsija': this.x_isannoitsija,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`DELETE ${path} failed:`, error.message);
      throw error;
    }
  }

  // --- SERVICE METHODS ---

  async haeKunnossapitoselvitykset(ytunnus) {
    return this._get(`/htj2/isannointi/v1/yhtio/${ytunnus}/kpts`);
  }

  async haeKunnossapitoselvitys(ytunnus, vuosi) {
    return this._get(`/htj2/isannointi/v1/yhtio/${ytunnus}/kpts/${vuosi}`);
  }

  async tallennaKunnossapitoselvitys(ytunnus, vuosi, data) {
    return this._post(`/htj2/isannointi/v1/yhtio/${ytunnus}/kpts/${vuosi}`, data);
  }

  async paivitaKunnossapitoselvitys(ytunnus, vuosi, data) {
    return this._put(`/htj2/isannointi/v1/yhtio/${ytunnus}/kpts/${vuosi}`, data);
  }

  async haeHanke(ytunnus, hanketunniste) {
    return this._get(`/htj2/isannointi/v1/yhtio/${ytunnus}/hanke/${hanketunniste}`);
  }

  async paivitaHanke(ytunnus, hanketunniste, data) {
    return this._put(`/htj2/isannointi/v1/yhtio/${ytunnus}/hanke/${hanketunniste}`, data);
  }

  async haeHankkeet(ytunnus) {
    return this._get(`/htj2/isannointi/v1/yhtio/${ytunnus}/hanke`);
  }

  async tallennaHankkeet(ytunnus, data) {
    return this._post(`/htj2/isannointi/v1/yhtio/${ytunnus}/hanke`, data);
  }

  async haeOsakasremontit(ytunnus) {
    return this._get(`/htj2/isannointi/v1/yhtio/${ytunnus}/osakasremontti`);
  }

  async haeKoodistoKPTS(ytunnus, vuosi, koodistotunnus) {
    return this._get(`/htj2/isannointi/v1/yhtio/${ytunnus}/kpts/${vuosi}/koodisto/${koodistotunnus}`);
  }

  async haeKoodistoHanke(ytunnus, hanketunniste, koodistotunnus) {
    return this._get(`/htj2/isannointi/v1/yhtio/${ytunnus}/hanke/${hanketunniste}/koodisto/${koodistotunnus}`);
  }

  async poistaKunnossapitoselvitysVersio(ytunnus, vuosi, versioId) {
    return this._delete(`/htj2/isannointi/v1/yhtio/${ytunnus}/kpts/${vuosi}/versio/${versioId}`);
  }

  async poistaHankeVersio(ytunnus, hanketunniste, versioId) {
    return this._delete(`/htj2/isannointi/v1/yhtio/${ytunnus}/hanke/${hanketunniste}/versio/${versioId}`);
  }

  async haeHallintakohteetJaOsakeryhmat(ytunnus) {
    return this._get(`/htj2/yhtio-julkinen/v1/yhtion-hallintakohteet-ja-osakeryhmat/haku?ytunnus=${ytunnus}`, useOld = false);
  }
}

module.exports = MMLHuoneistotIJService;
