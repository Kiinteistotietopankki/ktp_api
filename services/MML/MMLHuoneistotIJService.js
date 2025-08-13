const https = require('https');
const axios = require('axios');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');
const fs = require('fs');

let httpsAgent;


async function initHttpsAgent() {
  try {
    const vaultName = process.env.AZURE_KEYVAULT_NAME;
    const certName = process.env.AZURE_CERT_NAME;
    const certPassword = process.env.CLIENT_CERT_PASSWORD;

    if (!vaultName || !certName || !certPassword) {
      throw new Error('Missing AZURE_KEYVAULT_NAME, AZURE_CERT_NAME, or CLIENT_CERT_PASSWORD');
    }

    const credential = new DefaultAzureCredential({
      additionallyAllowedTenants: ["*"], // multi-tenant auth if needed
    });

    const secretClient = new SecretClient(`https://${vaultName}.vault.azure.net`, credential);

    // Azure stores the certificate as a secret (base64-encoded PFX)
    const secret = await secretClient.getSecret(certName);
    const pfxBuffer = Buffer.from(secret.value, 'base64');

    httpsAgent = new https.Agent({
      pfx: pfxBuffer,
      passphrase: certPassword,
      rejectUnauthorized: true, // set to false only for dev/test
    });

    console.log(`Loaded PFX certificate '${certName}' from Azure Key Vault`);
  } catch (err) {
    console.warn('Failed to load certificate from Azure Key Vault, using default HTTPS agent.', err);
    httpsAgent = new https.Agent({ rejectUnauthorized: true });
  }
}

// async function initHttpsAgent() {
//   try {
//     // Load PFX locally for testing
//     const pfxPath = './certs/mml-cert.pfx'; // path to your PFX file
//     const certPassword = process.env.CLIENT_CERT_PASSWORD;

//     httpsAgent = new https.Agent({
//       pfx: fs.readFileSync(pfxPath),
//       passphrase: certPassword,
//       rejectUnauthorized: true,
//     });

//     console.log(`Loaded local PFX certificate from ${pfxPath}`);
//   } catch (err) {
//     console.warn('Failed to load local certificate, using default HTTPS agent.', err);
//     httpsAgent = new https.Agent({
//       rejectUnauthorized: true,
//     });
//   }
// }

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

  async _get(path, useOld = true) {
    const url = useOld ? `${this.baseUrlVanha}${path}` : `${this.baseUrl}${path}`;
    try {
      const response = await axios.get(url, {
        auth: this.auth,
        httpsAgent,
        headers: { 'x-isannoitsija': this.x_isannoitsija },
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
        httpsAgent,
        headers: { 'x-isannoitsija': this.x_isannoitsija },
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
        httpsAgent,
        headers: { 'x-isannoitsija': this.x_isannoitsija },
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
        httpsAgent,
        headers: { 'x-isannoitsija': this.x_isannoitsija },
      });
      return response.data;
    } catch (error) {
      console.error(`DELETE ${path} failed:`, error.message);
      throw error;
    }
  }

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
    return this._get(`/htj2/yhtio-julkinen/v1/yhtion-hallintakohteet-ja-osakeryhmat/haku?ytunnus=${ytunnus}`, false);
  }
}

module.exports = { MMLHuoneistotIJService, initHttpsAgent };
