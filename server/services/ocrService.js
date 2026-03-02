const axios = require('axios');

async function extractTextFromImage(base64) {
  const apiKey = process.env.GOOGLE_VISION_API_KEY;
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const response = await axios.post(url, {
    requests: [
      {
        image: { content: base64 },
        features: [{ type: 'TEXT_DETECTION' }]
      }
    ]
  });
  return response.data;
}

module.exports = { extractTextFromImage };
