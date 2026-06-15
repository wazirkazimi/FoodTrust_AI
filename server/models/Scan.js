const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String
  },
  barcodeNumber: {
    type: String
  },
  fssaiNumber: {
    type: String
  },
  fssaiStatus: {
    type: String,
    enum: ['valid', 'invalid', 'unverified'],
    default: 'unverified'
  },
  vegStatus: {
    type: String,
    enum: ['veg', 'nonVeg', 'unknown'],
    default: 'unknown'
  },
  nutritionData: {
    calories: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    saturatedFat: { type: Number, default: 0 },
    transFat: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 }
  },
  scores: {
    customScore: { type: Number, min: 0, max: 10, default: 0 },
    nutriScore: { type: String, enum: ['A', 'B', 'C', 'D', 'E'] },
    nutriGrade: { type: String, enum: ['A', 'B', 'C', 'D'] },
    japaneseGrade: { type: String, enum: ['Excellent', 'Good', 'Fair', 'Poor'] }
  },
  healthMode: {
    type: String,
    enum: ['default', 'weightLoss', 'diabetic', 'gym'],
    default: 'default'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', scanSchema);