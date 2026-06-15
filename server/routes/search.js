const express = require('express');
const router = express.Router();
const { searchProducts, getCategories } = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Routes
router.get('/', searchProducts);
router.get('/categories', getCategories);

module.exports = router;