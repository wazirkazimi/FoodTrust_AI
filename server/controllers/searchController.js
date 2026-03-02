const openFood = require('../services/openFoodFactsService');

exports.search = async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ message: 'Query required' });
  try {
    const results = await openFood.searchByName(q);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.categories = async (req, res) => {
  // possibly fetch or hardcode categories
  res.json({ categories: ['Biscuits', 'Dairy', 'Snacks'] });
};
