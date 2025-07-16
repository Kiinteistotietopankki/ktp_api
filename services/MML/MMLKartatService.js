const axios = require('axios');
const fs = require('fs');
const path = require('path');
const proj4 = require('proj4');
proj4.defs("EPSG:3857", "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");

class MMLKartatService {
  constructor() {
    this.baseUrl = process.env.MML_KARTAT_BASEURL;
    this.apiKey = process.env.MML_KARTAT_APIKEY;
    this.authHeader = 'Basic ' + Buffer.from(`${this.apiKey}:${this.apiKey}`).toString('base64');
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


        // ✅ Log status code
        console.log(`Tile fetch response code: ${response.status}`);

        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.includes('image')) {
        throw new Error(`Unexpected content type: ${contentType}`);
        }

        if (!response.data || response.data.length === 0) {
        throw new Error('Tile fetch succeeded but returned empty data.');
        }

        const tileBuffer = Buffer.from(response.data);
        // const outputPath = path.resolve(__dirname, `tile_${z}_${x}_${y}.png`);
        // fs.writeFileSync(outputPath, tileBuffer);
        // console.log(`Tile saved to: ${outputPath}`);
        return tileBuffer;

    } catch (error) {
        if (error.response) {
        // ✅ Log error status code if available
        console.error(`Tile fetch failed: ${error.response.status} - ${error.response.statusText}`);
        } else {
        console.error(`Tile fetch failed: ${error.message}`);
        }
        throw error;
    }
    }



    latLngToTileFixed(lat, lng, zoom) {
    const TILE_SIZE = 256;

    // Convert lat/lng to meters in EPSG:3857
    const [xMeters, yMeters] = proj4('EPSG:4326', 'EPSG:3857', [lng, lat]);

    // Constants for WGS84 Pseudo-Mercator tile grid
    const xMin = -20037508.3427892480;
    const yMax = 20037508.3427892480;

    const initialResolution = 156543.033928041; // resolution at zoom 0
    const resolution = initialResolution / Math.pow(2, zoom);

    // Calculate column (x) and row (y) tile indices
    const col = Math.ceil((xMeters - xMin) / (TILE_SIZE * resolution));
    const row = Math.ceil((yMax - yMeters) / (TILE_SIZE * resolution));

    console.log(`lat/lng: ${lat}, ${lng}`);
    console.log(`meters: ${xMeters}, ${yMeters}`);
    console.log(`tile: x=${col}, y=${row}, zoom=${zoom}`);

    return { x: col, y: row };
    }

    async fetchTileByLatLng(layerName, tileMatrixSet, zoom, lat, lng) {
        const { x, y } = this.latLngToTileFixed(lat, lng, zoom);
        return await this.fetchTile(layerName, tileMatrixSet, zoom, y, x);
    } 
}

module.exports = MMLKartatService;
