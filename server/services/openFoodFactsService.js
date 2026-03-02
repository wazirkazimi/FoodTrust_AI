const axios = require('axios');

async function lookupByBarcode(barcode) {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  const res = await axios.get(url);
  return res.data;
}

async function searchByName(name) {
  const url = `https://world.openfoodfacts.org/cgi/search.pl`;
  const res = await axios.get(url, {
    params: { search_terms: name, json: true, country: 'india' }
  });
  return res.data;
}

module.exports = { lookupByBarcode, searchByName };
