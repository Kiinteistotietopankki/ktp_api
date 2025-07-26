const Rakennus = require('./rakennusRyhtiService.js').default;
const axios = require('axios');
const { ktEsitysmuotoon } = require('../../utils/ktMuuntaja');

class KiinteistoRyhtiService {
  constructor(tunnus, addresskey = '') {
    this.kiinteistotunnus = tunnus;
    this.addressKey = addresskey || null;
    this.urlKiinteistohaku =
      'https://paikkatiedot.ymparisto.fi/geoserver/ryhti_building/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ryhti_building:open_building&outputFormat=application/json&SRSNAME=EPSG:4326&CQL_FILTER=property_identifier=';
    this.rakennukset = [];
  }

  async init(haunOsoite = '') {
    try {
      const data = await this.fetchRakennukset(this.kiinteistotunnus);

      if (!Array.isArray(data?.features) || data.features.length === 0) {
        throw {
          name: 'RakennusNotFoundError',
          message: `Ei löytynyt rakennuksia kiinteistötunnukselle ${this.kiinteistotunnus}`,
          status: 404
        };
      }

      let rakennukset = await this.createRakennukset(data.features, this.addressKey, haunOsoite);

      if (haunOsoite.length > 0) {
        const regex = new RegExp(`^${haunOsoite}`, 'i');
        rakennukset = rakennukset.filter(rakennus => regex.test(rakennus?.KohteenOsoite));
      }

      this.rakennukset = rakennukset;
    } catch (error) {
      // Bubble up custom or unexpected error
      if (error?.status) {
        throw error;
      }
      throw {
        name: 'KiinteistoInitError',
        message: `Virhe kiinteistön ${this.kiinteistotunnus} alustuksessa`,
        status: 500,
        originalError: error
      };
    }
  }

  async fetchRakennukset(tunnus) {
    try {
      const response = await axios.get(`${this.urlKiinteistohaku}'${tunnus}'`);
      return response.data;
    } catch (error) {
      const status = error?.response?.status || 500;
      throw {
        name: 'RakennusFetchError',
        message: `Virhe rakennusten haussa kiinteistötunnukselle ${tunnus}`,
        status,
        originalError: error
      };
    }
  }

  async createRakennukset(features, addresskey = '', haunOsoite = '') {
    try {
      const rakennukset = features.map(feature => new Rakennus(feature, addresskey));
      await Promise.all(rakennukset.map(rakennus => rakennus.init(haunOsoite)));
      return rakennukset;
    } catch (error) {
      throw {
        name: 'RakennusInitError',
        message: 'Virhe rakennusten alustuksessa',
        status: error?.status || 500,
        originalError: error
      };
    }
  }

  getRakennukset() {
    return this.rakennukset;
  }

  toGeoJSON() {
    return {
      type: 'Kiinteisto',
      rakennukset: this.rakennukset.map(rakennus => rakennus.toGeoJSON()),
      id_kiinteistotunnus: this.kiinteistotunnus,
      id_esitysmuoto_kiinteistotunnus: ktEsitysmuotoon(this.kiinteistotunnus)
    };
  }
}

exports.default = KiinteistoRyhtiService;