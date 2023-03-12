const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
    },
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'category',
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: true,
    },
    images: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    alternateNames: [
      {
        type: String,
        trim: true,
        default: '',
      },
    ],
    ingredients: [
      {
        type: String,
        trim: true,
        default: '',
      },
    ],
    allergens: [
      {
        type: String,
        trim: true,
        default: '',
      },
    ],
    prices: [
      {
        quantity: {
          type: String,
          trim: true,
          default: '',
        },
        amount: {
          type: Number,
          default: 0,
        },
        discountType: {
          type: String,
          enum: ['Amount', 'Percent'],
          default: 'Percent',
        },
        discountAmount: {
          type: Number,
          default: 0,
        },
        discountMaxAmount: {
          type: Number,
          default: 0,
        },
        discountMinAmount: {
          type: Number,
          default: 0,
        },
      },
    ],
    diet: {
      type: String,
      enum: ['Veg', 'Non-Veg', 'Jain-Diet'],
      default: 'Veg',
    },
    note: {
      type: String,
      default: '',
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
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('menuitem', schema)
