const Report = require('../models/Report');

// @desc    Submit product report
// @route   POST /api/report
// @access  Private
const submitReport = async (req, res) => {
  try {
    const { productName, fssaiNumber, note } = req.body;
    const userId = req.user.userId;

    // Validation
    if (!productName || !fssaiNumber) {
      return res.status(400).json({ message: 'Product name and FSSAI number are required' });
    }

    // Create report
    const report = await Report.create({
      reportedBy: userId,
      productName,
      fssaiNumber,
      note: note || ''
    });

    res.status(201).json({
      message: 'Report submitted successfully',
      report: {
        id: report._id,
        productName: report.productName,
        fssaiNumber: report.fssaiNumber,
        note: report.note,
        createdAt: report.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  submitReport
};