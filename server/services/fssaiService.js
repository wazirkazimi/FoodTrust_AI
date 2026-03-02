const axios = require('axios');

async function verifyLicense(licenseNo) {
  const url = 'https://foscos.fssai.gov.in/api/searchlicencedetail';
  const res = await axios.post(url, { licenseNo }, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.FSSAI_API_KEY }
  });
  return res.data;
}

module.exports = { verifyLicense };
