const Scan = require('../models/Scan');

exports.uploadImage = async (req, res) => {
  // TODO: integrate OCR, grading, etc
  res.json({ message: 'image scanned' });
};

exports.scanBarcode = async (req, res) => {
  // TODO: integrate openFoodFacts lookup
  res.json({ message: 'barcode scanned' });
};

exports.history = async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(50);
    res.json(scans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.id);
    if (!scan) return res.status(404).json({ message: 'Not found' });
    res.json(scan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
