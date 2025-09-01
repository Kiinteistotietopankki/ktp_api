const Rakennus = require('./rakennusRyhtiService.js').default;
const axios = require('axios');
const { ktEsitysmuotoon } = require('../../utils/ktMuuntaja');
const turf = require('@turf/turf');

class KiinteistoRyhtiService {
  constructor(tunnus, addresskey = '') {
    this.kiinteistotunnus = tunnus;
    this.addressKey = addresskey || null;
    this.urlKiinteistohaku =
      'https://paikkatiedot.ymparisto.fi/geoserver/ryhti_building/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=ryhti_building:open_building&outputFormat=application/json&SRSNAME=EPSG:4326&CQL_FILTER=property_identifier=';
    this.rakennukset = [];

    this.urlKiinteistoPolygon = `https://avoin-paikkatieto.maanmittauslaitos.fi/kiinteisto-avoin/simple-features/v3/collections/PalstanSijaintitiedot/items?kiinteistotunnus=${tunnus}`;
    this.apikey = process.env.MML_KARTAT_APIKEY;

    this.area_m2 = null;
  }

    async init(haunOsoite = '') {
      try {
        // 1. Fetch rakennukset (but don’t init yet)
        const data = await this.fetchRakennukset(this.kiinteistotunnus);
        if (!Array.isArray(data?.features) || data.features.length === 0) {
          throw {
            name: 'RakennusNotFoundError',
            message: `Ei löytynyt rakennuksia kiinteistötunnukselle ${this.kiinteistotunnus}`,
            status: 404
          };
        }

        // 2. Fetch polygon + calculate area BEFORE creating rakennukset
        await this.fetchAndCalculateArea();

        // 3. Now create and init rakennukset, with area_m2 already set
        let rakennukset = await this.createRakennukset(data.features, this.addressKey, haunOsoite);

        if (haunOsoite.length > 0) {
          const regex = new RegExp(`^${haunOsoite}`, 'i');
          rakennukset = rakennukset.filter(rakennus => regex.test(rakennus?.KohteenOsoite));
        }

        this.rakennukset = rakennukset;

      } catch (error) {
        if (error?.status) throw error;
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
      const rakennukset = features.map(feature => new Rakennus(feature, addresskey, this.area_m2));
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

  async fetchAndCalculateArea() {
    try {
      const res = await axios.get(this.urlKiinteistoPolygon, {
        auth: {
          username: this.apikey,
          password: ''
        },
        headers: { 'accept': 'application/geo+json' }
      });
      const feature = res.data?.features?.[0];
      if (feature?.geometry) {
        const poly = turf.polygon(feature.geometry.coordinates);
        this.area_m2 = turf.area(poly);
      }
    } catch (error) {
      console.warn(
        `Polygonin haku/alueen laskenta epäonnistui kiinteistölle ${this.kiinteistotunnus}`,
        error.message
      );
      this.area_m2 = null;
    }
  }

  getRakennukset() {
    return this.rakennukset.map(rakennus => rakennus.toGeoJSON());
  }

  toGeoJSON() {
    return {
      type: 'Kiinteisto',
      rakennukset: this.rakennukset.map(rakennus => rakennus.toGeoJSON()),
      id_kiinteistotunnus: this.kiinteistotunnus,
      id_esitysmuoto_kiinteistotunnus: ktEsitysmuotoon(this.kiinteistotunnus),
      area_m2: this.area_m2*1.0065
    };
  }
}

exports.default = KiinteistoRyhtiService;
