const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    short_id: {
      type: String,
      unique: true,
    },
    delivery: {
      type: Boolean,
      default: false,
    },
    branch_slug: {
      type: String,
      unique: true,
    },
    branch_name: {
      type: String,
      required: true,
      trim: true,
    },
    branch_aboutus: {
      type: String,
      required: true,
      trim: true,
    },
    branch_manager: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      trim: true,
    },
    branch_address: {
      type: mongoose.Schema.ObjectId,
      ref: 'branch-address',
      required: true,
      trim: true,
    },
    restaurant_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'restaurant',
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
)
// to keep resturant branch name unqiue
schema.index({ restaurant_id: 1, branch_name: 1 }, { unique: true })
schema.index({ branch_slug: 'text', branch_name: 'text' })

module.exports = mongoose.model('branch', schema)
