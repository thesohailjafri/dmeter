const mongoose = require('mongoose')
const { isEmail, isMobilePhone } = require('validator')
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
    phone: {
      type: Number,
      unique: true,
      required: true,
      trim: true,
      validate: [isMobilePhone, 'Invalid phone number'],
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

schema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

schema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('customer', schema)
