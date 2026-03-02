const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/image', authMiddleware, scanController.uploadImage);
router.post('/barcode', authMiddleware, scanController.scanBarcode);
router.get('/history', authMiddleware, scanController.history);
router.get('/:id', authMiddleware, scanController.getById);

module.exports = router;
