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
    },
    branch_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'branch',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('category', schema)
