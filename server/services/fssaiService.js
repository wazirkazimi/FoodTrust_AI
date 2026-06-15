const axios = require('axios');

/**
 * Verify FSSAI license number
 * @param {String} fssaiNumber - 14-digit FSSAI number
 * @returns {String} Status: 'valid', 'invalid', or 'unverified'
 */
async function verifyFSSAINumber(fssaiNumber) {
  if (!fssaiNumber || fssaiNumber.length !== 14 || !/^\d+$/.test(fssaiNumber)) {
    return 'unverified';
  }

  try {
    const response = await axios.post(
      'https://foscos.fssai.gov.in/api/searchlicencedetail',
      {
        licenseNo: fssaiNumber
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.FSSAI_API_KEY}`
        },
        timeout: 10000 // 10 second timeout
      }
    );

    // Check if the response indicates a valid license
    if (response.data && response.data.status === 'success') {
      return 'valid';
    } else {
      return 'invalid';
    }
  } catch (error) {
    console.error('FSSAI API Error:', error.message);
    // Return unverified instead of throwing error to maintain app stability
    return 'unverified';
  }
}

module.exports = {
  verifyFSSAINumber
};