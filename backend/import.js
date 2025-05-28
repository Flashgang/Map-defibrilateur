const fs = require('fs');
const Papa = require('papaparse');
const axios = require('axios');

const API_URL = 'http://localhost:1337/api/defibrillateurs';
const API_TOKEN = 'e5ec451450be6adcebb8e2b3a6c8062ce9910432a79765d2809a09171b0d3b8b9b8707c3c010ec8795dd2b72fd0bfc8ca821556b99f84dc19b900b4fd8ff128ae5da0f7b1453f9b5f32d051b4697d964d84e35623dc9a2139653f7b40517fa593d44bb8b311841f48fba21d6a3eae9a18cd0336ace199acb46901e5b1f6de3c8'; // remplace par ton vrai token

const csvFilePath = './geodae.csv';

const csvData = fs.readFileSync(csvFilePath, 'utf8');

Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
  complete: async (results) => {
    for (const row of results.data) {
      // Vérifie que les coordonnées sont valides
      const lat = parseFloat(row.c_lat_coor1);
      const lon = parseFloat(row.c_long_coor1);
      if (isNaN(lat) || isNaN(lon)) continue;

      const defib = {
        data: {
          nom: row.c_nom || '',
          adr_num: row.c_adr_num || '',
          adr_voie: row.c_adr_voie || '',
          com_cp: row.c_com_cp || '',
          com_nom: row.c_com_nom || '',
          acc: row.c_acc || '',
          disp_j: row.c_disp_j || '',
          disp_h: row.c_disp_h || '',
          acc_complt: row.c_acc_complt || '',
          lat,
          lon
        }
      };

      try {
        await axios.post(API_URL, defib, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`
          }
        });
        console.log(`✅ Importé : ${defib.data.nom}`);
      } catch (err) {
        console.error('❌ Erreur:', err.response?.data || err.message);
      }
    }
  }
});
