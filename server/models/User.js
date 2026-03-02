const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  healthMode: { type: String, enum: ['default', 'weightLoss', 'diabetic', 'gym'], default: 'default' },
  vegFilter: { type: Boolean, default: false },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scan' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
