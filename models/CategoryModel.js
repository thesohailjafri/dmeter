const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    restaurant_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'restaurant',
      required: true,
      trim: true,
    },
    branch_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'branch',
      trim: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('category', schema)
