const Scan = require('../models/Scan');
const User = require('../models/User');
const { extractTextFromImage } = require('../services/ocrService');
const { verifyFSSAINumber } = require('../services/fssaiService');
const { getProductByBarcode } = require('../services/openFoodFactsService');
const { calculateAllGrades } = require('../services/gradingService');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// @desc    Upload image and analyze product
// @route   POST /api/scan/image
// @access  Private
const scanImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const userId = req.user.userId;

    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload_stream(
      { folder: 'foodtrust-scans' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Image upload failed' });
        }

        try {
          // Extract text from image using OCR
          const ocrResult = await extractTextFromImage(req.file.buffer);

          // Verify FSSAI number if found
          let fssaiStatus = 'unverified';
          if (ocrResult.fssaiNumber) {
            fssaiStatus = await verifyFSSAINumber(ocrResult.fssaiNumber);
          }

          // Get user for health mode
          const user = await User.findById(userId);

          // Calculate all grades
          const scores = calculateAllGrades(ocrResult.nutritionData, user.healthMode);

          // Determine veg status (basic implementation)
          let vegStatus = 'unknown';
          if (ocrResult.text.toLowerCase().includes('veg') || ocrResult.text.toLowerCase().includes('vegetarian')) {
            vegStatus = 'veg';
          } else if (ocrResult.text.toLowerCase().includes('non-veg') || ocrResult.text.toLowerCase().includes('chicken') || ocrResult.text.toLowerCase().includes('meat')) {
            vegStatus = 'nonVeg';
          }

          // Create scan record
          const scan = await Scan.create({
            userId,
            productName: 'Scanned Product', // Could be improved with better OCR
            imageUrl: result.secure_url,
            fssaiNumber: ocrResult.fssaiNumber,
            fssaiStatus,
            vegStatus,
            nutritionData: ocrResult.nutritionData,
            scores,
            healthMode: user.healthMode
          });

          res.json({
            message: 'Product scanned successfully',
            scan: {
              id: scan._id,
              productName: scan.productName,
              imageUrl: scan.imageUrl,
              fssaiStatus: scan.fssaiStatus,
              vegStatus: scan.vegStatus,
              nutritionData: scan.nutritionData,
              scores: scan.scores,
              healthMode: scan.healthMode,
              createdAt: scan.createdAt
            }
          });
        } catch (error) {
          console.error('Scan processing error:', error);
          res.status(500).json({ message: 'Failed to process scan' });
        }
      }
    );

    // Pipe the buffer to Cloudinary
    const bufferStream = require('stream').Readable.from(req.file.buffer);
    bufferStream.pipe(cloudinaryResult);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Scan barcode
// @route   POST /api/scan/barcode
// @access  Private
const scanBarcode = async (req, res) => {
  try {
    const { barcode } = req.body;
    const userId = req.user.userId;

    if (!barcode) {
      return res.status(400).json({ message: 'Barcode is required' });
    }

    // Get product data from Open Food Facts
    const productData = await getProductByBarcode(barcode);

    if (!productData) {
      return res.status(404).json({ message: 'Product not found in database' });
    }

    // Get user for health mode
    const user = await User.findById(userId);

    // Calculate all grades
    const scores = calculateAllGrades(productData.nutritionData, user.healthMode);

    // Create scan record
    const scan = await Scan.create({
      userId,
      productName: productData.name,
      imageUrl: productData.imageUrl,
      barcodeNumber: barcode,
      vegStatus: productData.vegStatus,
      nutritionData: productData.nutritionData,
      scores,
      healthMode: user.healthMode
    });

    res.json({
      message: 'Barcode scanned successfully',
      scan: {
        id: scan._id,
        productName: scan.productName,
        imageUrl: scan.imageUrl,
        barcodeNumber: scan.barcodeNumber,
        vegStatus: scan.vegStatus,
        nutritionData: scan.nutritionData,
        scores: scan.scores,
        healthMode: scan.healthMode,
        createdAt: scan.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's scan history
// @route   GET /api/scan/history
// @access  Private
const getScanHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const scans = await Scan.find({ userId }).sort({ createdAt: -1 });

    res.json({
      scans: scans.map(scan => ({
        id: scan._id,
        productName: scan.productName,
        imageUrl: scan.imageUrl,
        fssaiStatus: scan.fssaiStatus,
        vegStatus: scan.vegStatus,
        scores: scan.scores,
        createdAt: scan.createdAt
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single scan result
// @route   GET /api/scan/:id
// @access  Private
const getScanById = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);

    if (!scan) {
      return res.status(404).json({ message: 'Scan not found' });
    }

    // Check if scan belongs to user
    if (scan.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ scan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  scanImage,
  scanBarcode,
  getScanHistory,
  getScanById
};