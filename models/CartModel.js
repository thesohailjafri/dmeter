const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    products: [
      {
        product_id: { type: mongoose.Schema.ObjectId, ref: 'menuitem' },
        product_name: String,
        product_category: String,
        quantity: String,
        quantity_count: { type: Number, default: 1 },
        amount: Number,
        discount: Number,
      },
    ],
    discount: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    customer_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'customer',
      required: true,
    },
    branch_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'branch',
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'restaurant',
      required: true,
    },
  },
  { timestamps: true },
)
schema.index(
  {
    customer_id: 1,
    branch_id: 1,
    restaurant_id: 1,
  },
  { unique: true },
)

module.exports = mongoose.model('cart', schema)
