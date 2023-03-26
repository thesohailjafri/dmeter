const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    items: [
      {
        menuitem_id: { type: mongoose.Schema.ObjectId, ref: 'menuitem' },
        quantity: {
          type: Number,
          default: 1,
        },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    discount: {
      type: Number,
    },
    shipping: {
      type: Number,
    },
    customer_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'customer',
      required: true,
    },
    restaurant_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'restaurant',
      required: true,
    },
    branch_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'branch',
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('cart', schema)
