const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    short_id: {
      type: String,
      unique: true,
    },
    restaurant_name: {
      type: String,
      required: true,
      trim: true,
    },
    restaurant_description: {
      type: String,
      required: true,
      trim: true,
    },
    restaurant_image_url: {
      type: String,
      required: true,
    },
    restaurant_address: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'address',
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
    },
    otp: {
      type: Number,
    },
  },
  { timestamps: true },
)
// schema.index({ restaurant_name: 1, owner: 1 }, { unique: true })

module.exports = mongoose.model('restaurant', schema)
