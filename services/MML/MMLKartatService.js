const axios = require('axios');
const fs = require('fs');
const path = require('path');
const proj4 = require('proj4');

class MMLKartatService {
  constructor() {
    this.baseUrl = process.env.MML_KARTAT_BASEURL;
    this.apiKey = process.env.MML_KARTAT_APIKEY;
    this.authHeader = 'Basic ' + Buffer.from(`${this.apiKey}:${this.apiKey}`).toString('base64');

    // ETRS-TM35FIN proj4 määritelmä
    this.projETRSTM35FIN = '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs +towgs84=0,0,0';
    this.projWGS84 = 'EPSG:4326';

    // Lähtöpisteet JHS180
    this.xMIN_ETRS = -548576;
    this.yMAX_ETRS = 8388608;
  }

  async fetchTile(layerName, tileMatrixSet, z, y, x) {
    const tileUrl = `${this.baseUrl}/${layerName}/default/${tileMatrixSet}/${z}/${y}/${x}.png?`;

    const headers = {
      'Authorization': this.authHeader,
    };
    try {
      const response = await axios.get(tileUrl, {
        headers: headers,
        responseType: 'arraybuffer'
      });

      console.log('Request headers:', headers);
      console.log('Fetching tile from:', tileUrl);
      console.log(`Tile fetch response code: ${response.status}`);

      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.includes('image')) {
        throw new Error(`Unexpected content type: ${contentType}`);
      }

      if (!response.data || response.data.length === 0) {
        throw new Error('Tile fetch succeeded but returned empty data.');
      }

      return Buffer.from(response.data);
    } catch (error) {
      if (error.response) {
        console.error(`Tile fetch failed: ${error.response.status} - ${error.response.statusText}`);
      } else {
        console.error(`Tile fetch failed: ${error.message}`);
      }
      throw error;
    }
  }

  latLngToTileWGS84(lat, lng, zoom) {
    // Convert lat/lng (EPSG:4326) to EPSG:3857 (Pseudo-Mercator)
    const [x, y] = proj4('EPSG:4326', 'EPSG:3857', [lng, lat]);

    const xMIN = -20037508.342789248;
    const xMAX = 20037508.342789248;  // <-- added this line
    const yMAX = 20037508.342789248;
    const tileSize = 256;

    // Resolution at zoom level
    const resolution = (2 * xMAX) / (tileSize * Math.pow(2, zoom));

    // denom = pixels per tile * meters per pixel at zoom
    const denom = tileSize * resolution;

    const col = Math.floor((x - xMIN) / denom);
    const row = Math.floor((yMAX - y) / denom);

    return { x: col, y: row };
  }

  async fetchTileByLatLng(layerName, tileMatrixSet, zoom, lat, lng) {
    const { x, y } = this.latLngToTileWGS84(lat, lng, zoom);
    return await this.fetchTile(layerName, tileMatrixSet, zoom, y, x);
  }
}


module.exports = MMLKartatService;




