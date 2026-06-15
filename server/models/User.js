const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  healthMode: {
    type: String,
    enum: ['default', 'weightLoss', 'diabetic', 'gym'],
    default: 'default'
  },
  vegFilter: {
    type: Boolean,
    default: false
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scan'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);