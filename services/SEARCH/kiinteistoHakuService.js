const Kiinteisto = require('./kiinteistoRyhtiService').default; // removed `.default`
const axios = require('axios');

class KiinteistoHakuService {
  constructor(httpClient = axios) {
    this.http = httpClient;
    
    this.urlOsoitehaku = process.env.OSOITEHAKU_URL;
    this.urlOsoitehakuKunta = '%20AND%20postal_office_fin%20ILIKE%20';
    this.urlBuildingkeyRakennus = process.env.BUILDINGKEYHAKU_URL;
    this.urlBuildingkeyOsoite = process.env.OSOITEBUILDINGKEYHAKU_URL;
    this.addressConfirm = '%20AND%20address_fin%20ILIKE%20';
  }

  async haeKiinteistoja(kiinteistotunnus = '', osoite = '', kaupunki = '') {
    try {
      if (!kiinteistotunnus && !osoite) {
        return {
          status: 400,
          data: null,
          error: 'Osoite tai kiinteistötunnus on annettava.'
        };
      }

      if (osoite && kiinteistotunnus) {
        const osoiteData = await this.fetchOsoiteData(osoite, kaupunki);
        const buildingKeys = this.extractBuildingKeys(osoiteData);
        const addressKeys = this.extractAddressKeys(osoiteData);
        const ktFromAddress = await this.haeKiinteistotunnukset(buildingKeys);

        // Always include direct kiinteistötunnus result
        const directResult = await this.createKiinteistotWithoutAddress(kiinteistotunnus);
        const addressResult = await this.createKiinteistot(ktFromAddress, addressKeys, osoite);

        // Merge & deduplicate
        const combined = [...directResult, ...addressResult].reduce((acc, k) => {
          if (!acc.find(x => x.id === k.id)) acc.push(k);
          return acc;
        }, []);

        return { status: 200, data: combined.map(k => k.toGeoJSON()), error: null };
      }

      if (osoite) {
        const osoiteData = await this.fetchOsoiteData(osoite, kaupunki);
        const buildingKeys = this.extractBuildingKeys(osoiteData);
        const addressKeys = this.extractAddressKeys(osoiteData);
        const kiinteistotunnukset = await this.haeKiinteistotunnukset(buildingKeys);

        if (kiinteistotunnukset.size === 0) {
          return {
            status: 404,
            data: null,
            error: 'Osoitteelle ei löytynyt kiinteistöjä.'
          };
        }

      const data = await this.createKiinteistot(kiinteistotunnukset, addressKeys, osoite);
      return { status: 200, data: data.map(k => k.toGeoJSON()), error: null };
      }

      if (kiinteistotunnus) {
        const data = await this.createKiinteistotWithoutAddress(kiinteistotunnus);
        return { status: 200, data: data.map(k => k.toGeoJSON()), error: null };
      }

    } catch (error) {
      return {
        status: 500,
        data: null,
        error: `Virhe kiinteistöhakupalvelussa: ${error.message || error}`
      };
    }
  }

  async fetchOsoiteData(osoite, kaupunki = '') {
    let url;
    if (kaupunki.length > 0) {
      url = `${this.urlOsoitehaku}'${osoite}%25'${this.urlOsoitehakuKunta}'${kaupunki}'`;
    } else {
      url = `${this.urlOsoitehaku}'${osoite}%25'`;
    }

    const response = await this.http.get(url);
    return response.data;
  }

  extractBuildingKeys(osoiteData) {
    return [...new Set(osoiteData.features.map(f => f.properties.building_key))];
  }

  extractAddressKeys(osoiteData) {
    return [...new Set(osoiteData.features.map(f => f.properties.address_key))];
  }

  async haeKiinteistotunnukset(buildingKeys) {
    const kiinteistotunnukset = new Set();
    const errors = [];

    for (const key of buildingKeys) {
      try {
        const data = await this.fetchBuildingKeyData(key);
        const tunnus = this.extractTunnus(data);
        if (tunnus) kiinteistotunnukset.add(tunnus);
      } catch (err) {
        errors.push({ key, error: err.message || err });
      }
    }

    if (kiinteistotunnukset.size === 0) {
      throw new Error(`Rakennuksista ei löytynyt kiinteistötunnuksia. Virheitä: ${JSON.stringify(errors)}`);
    }

    return kiinteistotunnukset;
  }

  async fetchBuildingKeyData(key) {
    const res = await this.http.get(`${this.urlBuildingkeyRakennus}${key}`);
    return res.data;
  }

  extractTunnus(data) {
    const feature = data.features?.[0];
    return feature?.properties?.property_identifier;
  }

  async createKiinteistot(kiinteistotunnukset, addresskeys = '', osoite = '') {
    const kiinteistotunnusArray = typeof kiinteistotunnukset === 'string'
      ? [kiinteistotunnukset]
      : Array.from(kiinteistotunnukset);

    const akList = Array.from(addresskeys);
    const tunnuksetWithAddressKeys = kiinteistotunnusArray.map((val, index) => [val, akList[index]]);

    const kiinteistot = tunnuksetWithAddressKeys.map(
      ([kt, addressKey]) => new Kiinteisto(kt, addressKey)
    );

    await Promise.all(kiinteistot.map(k => k.init(osoite)));
    return kiinteistot;
  }

  async createKiinteistotWithoutAddress(kiinteistotunnukset) {
    const kiinteistotunnusArray = typeof kiinteistotunnukset === 'string'
      ? [kiinteistotunnukset]
      : Array.from(kiinteistotunnukset);

    const kiinteistot = kiinteistotunnusArray.map(tunnus => new Kiinteisto(tunnus));
    await Promise.all(kiinteistot.map(k => k.init()));
    return kiinteistot;
  }
}

module.exports = KiinteistoHakuService;