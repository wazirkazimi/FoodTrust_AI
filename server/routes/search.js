const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.search); // ?q=name
router.get('/categories', searchController.categories);

module.exports = router;
