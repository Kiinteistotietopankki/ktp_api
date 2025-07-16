import fetch from 'node-fetch';

class MMLKartatService {
  constructor() {
    this.baseUrl = process.env.MML_KARTAT_BASEURL;
    this.apiKey = process.env.MML_KARTAT_APIKEY
    this.authHeader = 'Basic ' + Buffer.from(`${this.apiKey}:${this.apiKey}`).toString('base64');
  }

  async fetchTile(layerName, tileMatrixSet, z, x, y) {
    const tileUrl = `${this.baseUrl}/${layerName}/default/${tileMatrixSet}/${z}/${y}/${x}.png`;

    const response = await fetch(tileUrl, {
      headers: {
        'Authorization': this.authHeader,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Tile fetch error: ${response.status} - ${text}`);
    }

    const buffer = await response.buffer();
    return buffer;
  }
}

export default MMLKartatService;