// Building.js
const axios = require('axios');
const { ktEsitysmuotoon }  = require('../../utils/ktMuuntaja')
const rakennusKoodit = require("../../utils/rakennusKoodit");
const turf = require('@turf/turf');
const nearestPointOnLine = require('@turf/nearest-point-on-line').default;

const proj4 = require('proj4');

class RakennusRyhtiService {
    constructor(feature, addreskey='') { // Initial feature is always building data
        const p = feature.properties || {};
        const rawId = feature.id || null;

        this.id = rawId ? rawId.split(".").pop() : null; // Also known as buildingkey
    
        // Flatten geometry
        this.geometryType = feature.geometry?.type || null;
        this.coordinates = feature.geometry?.coordinates || [];

        this.Addresskey = addreskey || null // Original addresskey
    
        // Flatten formerly nested properties into direct fields
        this.Rakennustunnus = p.permanent_building_identifier || null;
        this.Kiinteistotunnus = p.property_identifier || null;
        this.KiinteistotunnusEsitysmuoto = ktEsitysmuotoon(p.property_identifier) || null
        this.KohteenNimi = null;
        this.KohteenOsoite = p.address_fin || []; // Osoite hausta
        this.Postinumero = p.postal_code || null; // Osoite hausta
        this.Toimipaikka = p.postal_office_fin || null; // Osoite hausta

    
        this.Rakennusvuosi = p.completion_date ? p.completion_date.split("-")[0] : null;
        this.Kokonaisala = p.total_area || null;
        this.Kerrosala = p.gross_floor_area || null;
        this.Huoneistoala = p.floor_area || null;
        this.Tilavuus = p.volume || null;
        this.Kerroksia = p.number_of_storeys || null;
        this.Huoneistoja = p.apartment_count || null;
    
        const getCode = uri => uri?.split("/").pop() || null;
        this.Rakennusluokitus = rakennusKoodit.rakennusluokitus[getCode(p.main_purpose)] || null;
        this.Runkotapa = rakennusKoodit.rakentamistapa[getCode(p.construction_method)] || null;
        this.Kaytossaolotilanne = rakennusKoodit.kayttotilanne[getCode(p.usage_status)] || null;
        this.JulkisivunRakennusaine = rakennusKoodit.julkisivumateriaali[getCode(p.facade_material)] || null;
        this.Lammitystapa = rakennusKoodit.lammitystapa[getCode(p.heating_method)] || null;
        this.Lammitysenergianlahde = rakennusKoodit.lammitysenergialahde[getCode(p.heating_energy_source)] || null;
        this.KantavanRakenteenRakennusaine = rakennusKoodit.rakennusaine[getCode(p.material_of_load_bearing_structures)] || null;

    
        // Placeholder fields
        this.Tulvariski = [];

        this.Pohjavesialueet = []; // each item: { nimi, etaisyys, alueella }

        this.RadonArvo = null;
      }


      async init(haunOsoite=''){
        const data = await this.fetchAddressData(this.id, haunOsoite);
        const osoiteFeature = data?.features;
        this.setAddressData(osoiteFeature);
        await this.checkPohjavesi();
        await this.checkTulvariski()
      }

      async fetchAddressData(buildingkey, haunOsoite=''){
        const url = 'https://paikkatiedot.ymparisto.fi/geoserver/ryhti_building/wfs?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=ryhti_building:open_address&SRSNAME=EPSG:4326&CQL_FILTER=building_key=';
        const addressConfirm = '%20AND%20address_fin%20ILIKE%20'
        const addressNumberConfirm = `%20AND%20address_number='1'`
        const addressKeyConfirm = `%20AND%20address_key='${this.Addresskey}'`

        try {
          let response
          if (haunOsoite.length > 0){
            // response = await axios.get(`${url}'${buildingkey}'${addressKeyConfirm}`);
            response = await axios.get(`${url}'${buildingkey}'${addressConfirm}'${haunOsoite}%25'`);
            // if (response.data?.features?.length < 1){
            //   response = await axios.get(`${url}'${buildingkey}'${addressNumberConfirm}`);

            // }
          } else{
            // response = await axios.get(`${url}'${buildingkey}'${addressNumberConfirm}`);
            response = await axios.get(`${url}'${buildingkey}'`);
          }
          return response.data;
        } catch (error) {
          console.error("Virhe rakennuksen osoitetietojen haussa:", error);
          return null;
        }
      }


async checkPohjavesi() {
    if (!this.coordinates?.length) return;

    // Determine building point (centroid if polygon/multipolygon)
    let lonLat;
    if (this.geometryType === 'Point') {
        lonLat = this.coordinates;
    } else if (this.geometryType === 'Polygon' || this.geometryType === 'MultiPolygon') {
        const centroid = turf.centroid(
            this.geometryType === 'Polygon' ? turf.polygon(this.coordinates) : turf.multiPolygon(this.coordinates)
        );
        lonLat = centroid.geometry.coordinates; // [lon, lat]
    } else {
        return;
    }

    // Ensure EPSG:3067 is defined
    if (!proj4.defs['EPSG:3067']) {
        proj4.defs(
            'EPSG:3067',
            '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs'
        );
    }

    // Transform WGS84 -> EPSG:3067
    const [x, y] = proj4('EPSG:4326', 'EPSG:3067', lonLat);

    // WFS query
    const radiusMeters = 500; 
    const cqlFilter = `DWITHIN(geom, POINT(${x} ${y}), ${radiusMeters}, meters)`;
    const url = 'https://paikkatiedot.ymparisto.fi/geoserver/syke_vhspohjavesi/ows';
    const wfsUrl = `${url}?service=WFS&version=1.0.0&request=GetFeature&typeName=syke_vhspohjavesi:VHS2016_Pohjavesi&outputFormat=application/json&SRSNAME=EPSG:3067&CQL_FILTER=${encodeURIComponent(cqlFilter)}`;

    try {
        const response = await axios.get(wfsUrl);
        const features = response.data?.features || [];

        if (features.length === 0) {
            this.Pohjavesialueet = [];
            return;
        }

        const buildingPoint = turf.point(lonLat); // in EPSG:4326

        this.Pohjavesialueet = features.map(f => {
            // Transform coords
            const transformCoords = (coords) => {
                if (Array.isArray(coords[0][0])) { // MultiPolygon
                    return coords.map(polygon => polygon.map(ring => ring.map(([x, y]) => proj4('EPSG:3067', 'EPSG:4326', [x, y]))));
                }
                return coords.map(ring => ring.map(([x, y]) => proj4('EPSG:3067', 'EPSG:4326', [x, y])));
            };

            const polygon = f.geometry.type === 'Polygon'
                ? turf.polygon(transformCoords(f.geometry.coordinates))
                : turf.multiPolygon(transformCoords(f.geometry.coordinates));

            const inside = turf.booleanPointInPolygon(buildingPoint, polygon);

            let distance = 0;
            if (!inside) {
                let minDist = Infinity;

                const coordsToLine = (coords) => {
                    for (const ring of coords) {
                        const line = turf.lineString(ring);
                        const nearest = nearestPointOnLine(line, buildingPoint);
                        const km = turf.distance(buildingPoint, nearest, { units: 'kilometers' });
                        minDist = Math.min(minDist, km * 1000);
                    }
                };

                if (polygon.geometry.type === 'Polygon') {
                    coordsToLine(polygon.geometry.coordinates);
                } else {
                    for (const poly of polygon.geometry.coordinates) {
                        coordsToLine(poly);
                    }
                }
                distance = minDist;
            }

            return {
                nimi: f.properties.pvaluenimi,
                luokka: f.properties.pvalueluokka,
                etäisyys: inside ? 'Alueella' : distance.toFixed(2) + ' m',
            };
        });

    } catch (err) {
        console.error("Virhe pohjavesialueen haussa:", err);
        this.Pohjavesialueet = [];
    }
}

async checkTulvariski() {
    if (!this.coordinates?.length) return;

    let lonLat;
    if (this.geometryType === 'Point') {
        lonLat = this.coordinates; // [lon, lat]
    } else if (this.geometryType === 'Polygon' || this.geometryType === 'MultiPolygon') {
        const centroid = turf.centroid(
            this.geometryType === 'Polygon' ? turf.polygon(this.coordinates) : turf.multiPolygon(this.coordinates)
        );
        lonLat = centroid.geometry.coordinates;
    } else {
        return;
    }

    // Ensure EPSG:3067 is defined
    if (!proj4.defs['EPSG:3067']) {
        proj4.defs(
            'EPSG:3067',
            '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs'
        );
    }

    // Transform building point → EPSG:3067
    const [x, y] = proj4('EPSG:4326', 'EPSG:3067', lonLat);
    const buildingPoint = [x, y]; // just a simple [x, y] for Euclidean calculation

    const radiusMeters = 500; // search radius
    const cqlFilter = `DWITHIN(geom, POINT(${x} ${y}), ${radiusMeters}, meters)`;
    const url = 'https://paikkatiedot.ymparisto.fi/geoserver/inspire_nz/ows';

    const layers = [
        {
            typeName: 'inspire_nz:NZ.Merkittavat_tulvariskialueet',
            label: 'Merkittävä tulvariski'
        },
        {
            typeName: 'inspire_nz:NZ.Tulvavaaravyohykkeet_Vesistotulva_1_100a',
            label: 'Tulvavaara (vesistötulva 1/100a)'
        },
        // {
        //     typeName: 'inspire_nz:NZ.Tulvavaaravyohykkeet_Meritulva_1_100a',
        //     label: 'Tulvavaara (meritulva 1/100a)'
        // }
    ];

    this.Tulvariski = [];

    try {
        for (const layer of layers) {
            const wfsUrl = `${url}?service=WFS&version=1.0.0&request=GetFeature&typeName=${layer.typeName}&outputFormat=application/json&SRSNAME=EPSG:3067&CQL_FILTER=${encodeURIComponent(cqlFilter)}`;
            console.log("Querying:", wfsUrl);

            const response = await axios.get(wfsUrl);
            const features = response.data?.features || [];
            if (features.length === 0) continue;

            let closestFeature = null;
            let closestDistance = Infinity;

            for (const f of features) {
                const geom = f.geometry; // EPSG:3067
                const polygons = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

                for (const poly of polygons) {
                    const outerRing = poly[0]; // only outer ring for distance
                    // find closest point in the ring
                    for (const [px, py] of outerRing) {
                        const dx = px - buildingPoint[0];
                        const dy = py - buildingPoint[1];
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < closestDistance) {
                            closestDistance = dist;
                            closestFeature = f;
                        }
                    }
                }
            }

            if (closestFeature) {
                const geom = closestFeature.geometry;
                const polygons = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
                let inside = false;
                for (const poly of polygons) {
                    const polygon = turf.polygon(poly);
                    if (turf.booleanPointInPolygon(turf.point(buildingPoint), polygon)) {
                        inside = true;
                        break;
                    }
                }

                this.Tulvariski.push({
                    lähde: layer.label,
                    nimi: closestFeature.properties.nimi || closestFeature.properties.tunnus || 'Tuntematon',
                    etäisyys: inside ? 'Alueella' : closestDistance.toFixed(2) + ' m',
                });
            }
        }
    } catch (err) {
        console.error("Virhe tulvariskialueen haussa:", err);
        this.Tulvariski = [];
    }
}








      async setAddressData(features) {
        
        if (!features) return;
      
        for (const feature of features){
          if (!feature || !feature.properties) continue;

          const p = feature.properties;
      
          this.KohteenOsoite.push(p.address_fin);
          this.Postinumero ??= p.postal_code || null;
          this.Toimipaikka ??= p.postal_office_fin || null
        }
      }
    
      /**
       * Return a plain object for JSON serialization
       */
      toJSON() {
        return {
          buildingkey: this.id,
          Rakennustunnus: this.Rakennustunnus,
          Kiinteistotunnus: this.Kiinteistotunnus,
          KohteenNimi: this.KohteenNimi,
          KohteenOsoite: this.KohteenOsoite,
          Postinumero: this.Postinumero,
          Toimipaikka: this.Toimipaikka,
          Rakennusvuosi: this.Rakennusvuosi,
          Kokonaisala: this.Kokonaisala,
          Kerrosala: this.Kerrosala,
          Huoneistoala: this.Huoneistoala,
          Tilavuus: this.Tilavuus,
          Kerroksia: this.Kerroksia,
          Huoneistoja: this.Huoneistoja,
          Rakennusluokitus: this.Rakennusluokitus,
          Runkotapa: this.Runkotapa,
          Kaytossaolotilanne: this.Kaytossaolotilanne,
          JulkisivunRakennusaine: this.JulkisivunRakennusaine,
          Lammitystapa: this.Lammitystapa,
          Lammitysenergianlahde: this.Lammitysenergianlahde,
          KantavanRakenteenRakennusaine: this.KantavanRakenteenRakennusaine,
          Tulvariski: this.Tulvariski,
          Pohjavesialueet: this.Pohjavesialueet,
          RadonArvo: this.RadonArvo,
        };
      }

      toCategoriesJSON() {
        const sourceYmparistofi = "Ympäristö.fi";


        return {
          yleistiedot: {
            "Rakennustunnus": { value: this.Rakennustunnus, source: sourceYmparistofi },
            "Kiinteistötunnus": { value: this.KiinteistotunnusEsitysmuoto, source: sourceYmparistofi },
            "Kiinteistötunnus kokonainen": { value: this.Kiinteistotunnus, source: sourceYmparistofi },
            "Kohteen nimi": { value: null, source: null },
            "Kohteen osoitteet": { value: this.KohteenOsoite, source: sourceYmparistofi },
            "Postinumero": { value: this.Postinumero, source: sourceYmparistofi },
            "Toimipaikka": { value: this.Toimipaikka, source: sourceYmparistofi },
          },
          teknisettiedot: {
            "Rakennusvuosi": { value: this.Rakennusvuosi,  source: sourceYmparistofi  },
            "Kokonaisala (m²)": { value: this.Kokonaisala,  source: sourceYmparistofi },
            "Kerrosala (m²)": { value: this.Kerrosala,  source: sourceYmparistofi },
            "Huoneistoala (m²)": { value: this.Huoneistoala,  source: sourceYmparistofi  },
            "Tilavuus (m³)": { value: this.Tilavuus,  source: sourceYmparistofi },
            "Kerroksia": { value: this.Kerroksia, source: sourceYmparistofi  },
            "Huoneistojen lukumäärä" : {value: this.Huoneistoja, source: sourceYmparistofi}
          },
          rakennustiedot: {
            "Rakennusluokitus": { value: this.Rakennusluokitus,  source: sourceYmparistofi  },
            "Runkotapa": { value: this.Runkotapa,  source: sourceYmparistofi  },
            "Käytössäolotilanne": { value: this.Kaytossaolotilanne,  source: sourceYmparistofi },
            "Julkisivun rakennusaine": { value: this.JulkisivunRakennusaine, source: sourceYmparistofi },
            "Lämmitystapa": { value: this.Lammitystapa, source: sourceYmparistofi },
            "Lämmitysenergianlähde": { value: this.Lammitysenergianlahde, source: sourceYmparistofi  },
            "Kantavanrakenteen rakennusaine": { value: this.KantavanRakenteenRakennusaine, source: sourceYmparistofi },
          },
          aluetiedot: {
            "Tulvariski": { value: this.Tulvariski, source: sourceYmparistofi },
            "Pohjavesialueet": { value: this.Pohjavesialueet, source: sourceYmparistofi },
            "radon arvo": { value: null, source: sourceYmparistofi}
          }      
        }
      }


      toGeoJSON() {
        return {
            type: "Rakennus",
            geometry: {
                type: this.geometryType, 
                coordinates: this.coordinates 
            },
            id_buildingkey:this.id,
            id_rakennustunnus:this.Rakennustunnus,
            properties: this.toCategoriesJSON(),
        };
    }
  }

exports.default = RakennusRyhtiService