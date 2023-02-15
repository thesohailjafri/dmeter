const mongoose = require('mongoose')
const { isMobilePhone } = require('validator')

const schema = new mongoose.Schema(
  {
    addressline: {
      type: String,
      min: 50,
      max: 500,
      required: true,
    },
    phone: [
      {
        type: String,
        required: true,
        trim: true,
        validate: [isMobilePhone, 'Invalid phone number'],
      },
    ],

    pincode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      min: 2,
      max: 100,
      required: true,
    },
    state: {
      type: String,
      min: 2,
      max: 100,
      required: true,
    },
    country: {
      type: String,
      min: 2,
      max: 100,
      required: true,
    },
    google_location: { type: String },
  },
  { timestamps: true },
)

module.exports = mongoose.model('branch-address', schema)
