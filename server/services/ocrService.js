const axios = require('axios');

/**
 * Extract text from image using Google Vision API
 * @param {Buffer} imageBuffer - Image buffer
 * @returns {Object} Extracted text and data
 */
async function extractTextFromImage(imageBuffer) {
  try {
    const base64Image = imageBuffer.toString('base64');

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
      {
        requests: [{
          image: {
            content: base64Image
          },
          features: [{
            type: 'TEXT_DETECTION'
          }]
        }]
      }
    );

    const textAnnotations = response.data.responses[0]?.textAnnotations;
    if (!textAnnotations || textAnnotations.length === 0) {
      return { text: '', fssaiNumber: null, nutritionData: {} };
    }

    const fullText = textAnnotations[0].description;

    // Extract FSSAI number (14-digit number)
    const fssaiRegex = /\b\d{14}\b/;
    const fssaiMatch = fullText.match(fssaiRegex);
    const fssaiNumber = fssaiMatch ? fssaiMatch[0] : null;

    // Extract nutrition data (basic implementation)
    const nutritionData = extractNutritionData(fullText);

    return {
      text: fullText,
      fssaiNumber,
      nutritionData
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to process image');
  }
}

/**
 * Extract nutrition data from OCR text
 * @param {String} text - OCR extracted text
 * @returns {Object} Nutrition data
 */
function extractNutritionData(text) {
  const nutrition = {
    calories: 0,
    sugar: 0,
    fat: 0,
    saturatedFat: 0,
    transFat: 0,
    protein: 0,
    fiber: 0
  };

  // Simple regex patterns for common nutrition labels
  const patterns = {
    calories: /(?:energy|calories?)\s*:?\s*(\d+(?:\.\d+)?)/i,
    sugar: /sugar\s*:?\s*(\d+(?:\.\d+)?)/i,
    fat: /(?:total\s+)?fat\s*:?\s*(\d+(?:\.\d+)?)/i,
    saturatedFat: /saturat(?:ed)?\s+fat\s*:?\s*(\d+(?:\.\d+)?)/i,
    transFat: /trans\s+fat\s*:?\s*(\d+(?:\.\d+)?)/i,
    protein: /protein\s*:?\s*(\d+(?:\.\d+)?)/i,
    fiber: /fiber\s*:?\s*(\d+(?:\.\d+)?)/i
  };

  Object.keys(patterns).forEach(key => {
    const match = text.match(patterns[key]);
    if (match) {
      nutrition[key] = parseFloat(match[1]);
    }
  });

  return nutrition;
}

module.exports = {
  extractTextFromImage,
  extractNutritionData
};