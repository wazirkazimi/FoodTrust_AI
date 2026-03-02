const Report = require('../models/Report');

exports.submitReport = async (req, res) => {
  try {
    const { productName, fssaiNumber, note } = req.body;
    const report = await Report.create({
      reportedBy: req.user.id,
      productName,
      fssaiNumber,
      note
    });
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
