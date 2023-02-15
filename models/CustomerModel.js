const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [isEmail, 'Invalid email'],
    },
    name: {
      first: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
      },
      last: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
      },
    },
    phone: {
      type: Number,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    otp: {
      type: Number,
    },
    restaurant: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
      },
    ],
  },
  { timestamps: true },
)

schema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('Customer', schema)
