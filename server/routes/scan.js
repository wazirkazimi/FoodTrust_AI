const express = require('express');
const router = express.Router();
const { scanImage, scanBarcode, getScanHistory, getScanById } = require('../controllers/scanController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Routes
router.post('/image', upload.single('image'), scanImage);
router.post('/barcode', scanBarcode);
router.get('/history', getScanHistory);
router.get('/:id', getScanById);

module.exports = router;