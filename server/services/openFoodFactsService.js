const axios = require('axios');

/**
 * Search products by name using Open Food Facts API
 * @param {String} query - Search query
 * @param {Number} limit - Maximum results
 * @returns {Array} Product results
 */
async function searchProductsByName(query, limit = 20) {
  try {
    const response = await axios.get(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=true&country=india&limit=${limit}`
    );

    if (!response.data.products) {
      return [];
    }

    return response.data.products.map(product => ({
      id: product.code,
      name: product.product_name || 'Unknown Product',
      imageUrl: product.image_url,
      barcode: product.code,
      brands: product.brands,
      categories: product.categories,
      nutritionData: extractNutritionFromOFF(product),
      vegStatus: determineVegStatus(product)
    }));
  } catch (error) {
    console.error('Open Food Facts search error:', error);
    return [];
  }
}

/**
 * Get product by barcode
 * @param {String} barcode - Product barcode
 * @returns {Object|null} Product data or null
 */
async function getProductByBarcode(barcode) {
  try {
    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );

    if (response.data.status === 0) {
      return null; // Product not found
    }

    const product = response.data.product;
    return {
      id: product.code,
      name: product.product_name || 'Unknown Product',
      imageUrl: product.image_url,
      barcode: product.code,
      brands: product.brands,
      categories: product.categories,
      nutritionData: extractNutritionFromOFF(product),
      vegStatus: determineVegStatus(product)
    };
  } catch (error) {
    console.error('Open Food Facts barcode lookup error:', error);
    return null;
  }
}

/**
 * Extract nutrition data from Open Food Facts product
 * @param {Object} product - OFF product object
 * @returns {Object} Standardized nutrition data
 */
function extractNutritionFromOFF(product) {
  const nutriments = product.nutriments || {};

  return {
    calories: nutriments['energy-kcal_100g'] || nutriments['energy_100g'] ? Math.round(nutriments['energy_100g'] / 4.184) : 0,
    sugar: nutriments['sugars_100g'] || 0,
    fat: nutriments['fat_100g'] || 0,
    saturatedFat: nutriments['saturated-fat_100g'] || 0,
    transFat: nutriments['trans-fat_100g'] || 0,
    protein: nutriments['proteins_100g'] || 0,
    fiber: nutriments['fiber_100g'] || 0
  };
}

/**
 * Determine if product is veg/non-veg based on OFF data
 * @param {Object} product - OFF product object
 * @returns {String} 'veg', 'nonVeg', or 'unknown'
 */
function determineVegStatus(product) {
  const labels = product.labels || '';
  const categories = product.categories || '';
  const ingredients = product.ingredients_text || '';

  const vegIndicators = ['vegetarian', 'veg', 'plant-based', 'dairy'];
  const nonVegIndicators = ['meat', 'chicken', 'fish', 'pork', 'beef', 'non-vegetarian', 'non-veg'];

  const allText = `${labels} ${categories} ${ingredients}`.toLowerCase();

  if (nonVegIndicators.some(indicator => allText.includes(indicator))) {
    return 'nonVeg';
  } else if (vegIndicators.some(indicator => allText.includes(indicator))) {
    return 'veg';
  }

  return 'unknown';
}

module.exports = {
  searchProductsByName,
  getProductByBarcode,
  extractNutritionFromOFF,
  determineVegStatus
};