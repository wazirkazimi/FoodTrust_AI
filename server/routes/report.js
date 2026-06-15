const express = require('express');
const router = express.Router();
const { submitReport } = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Routes
router.post('/', submitReport);

module.exports = router;