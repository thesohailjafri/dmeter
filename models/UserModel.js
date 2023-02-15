const mongoose = require('mongoose')
const { isEmail, isMobilePhone } = require('validator')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      validate: [isEmail, 'Invalid email address'],
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
      type: String,
      required: true,
      trim: true,
      validate: [isMobilePhone, 'Invalid phone number'],
    },
    password: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      enum: ['owner', 'manager', 'cook', 'staff'],
      default: 'staff',
      lowercase: true,
      required: true,
      trim: true,
    },
    address_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'address',
      required: true,
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

schema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

schema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('user', schema)
