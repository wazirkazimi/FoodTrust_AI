const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/mode', authMiddleware, userController.updateMode);
router.put('/veg', authMiddleware, userController.updateVeg);
router.get('/bookmarks', authMiddleware, userController.getBookmarks);
router.post('/bookmark/:scanId', authMiddleware, userController.addBookmark);

module.exports = router;
