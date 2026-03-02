const User = require('../models/User');

exports.updateMode = async (req, res) => {
  try {
    const { mode } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { healthMode: mode }, { new: true });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateVeg = async (req, res) => {
  try {
    const { veg } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { vegFilter: veg }, { new: true });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('bookmarks');
    res.json(user.bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const { scanId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user.bookmarks.includes(scanId)) {
      user.bookmarks.push(scanId);
      await user.save();
    }
    res.json(user.bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
