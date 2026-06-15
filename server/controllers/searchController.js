const { searchProductsByName } = require('../services/openFoodFactsService');
const { calculateAllGrades } = require('../services/gradingService');
const User = require('../models/User');

// @desc    Search products by name
// @route   GET /api/search?q=name
// @access  Private
const searchProducts = async (req, res) => {
  try {
    const { q: query } = req.query;
    const userId = req.user.userId;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Get user for health mode
    const user = await User.findById(userId);

    // Search products
    const products = await searchProductsByName(query, 20);

    // Calculate grades for each product
    const productsWithGrades = products.map(product => ({
      ...product,
      scores: calculateAllGrades(product.nutritionData, user.healthMode)
    }));

    res.json({
      products: productsWithGrades
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get product categories
// @route   GET /api/search/categories
// @access  Private
const getCategories = async (req, res) => {
  try {
    // Common food categories
    const categories = [
      'Biscuits',
      'Breakfast & Spreads',
      'Cold Drinks',
      'Chocolates',
      'Snacks',
      'Dairy',
      'Ready-to-eat',
      'Cereals',
      'Beverages',
      'Confectionery'
    ];

    res.json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  searchProducts,
  getCategories
};