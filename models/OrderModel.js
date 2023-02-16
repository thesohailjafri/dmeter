const mongoose = require('mongoose')
const { isMobilePhone } = require('validator')

const schema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      trim: true,
      required: true,
    },
    customer_phone: {
      type: String,
      trim: true,
      required: true,
      validate: [isMobilePhone, 'Invalid phone number'],
    },
    order_status: {
      type: String,
      enum: [
        'Placed',
        'Processed',
        'Preparing',
        'Ready',
        'Out-For-Delivery',
        'Completed',
        'Cancelled',
        'Refunded',
      ],
      default: 'Placed',
      trim: true,
    },
    order_address: {
      type: String,
      trim: true,
    },
    order_city: {
      type: String,
      trim: true,
    },
    order_state: {
      type: String,
      trim: true,
    },
    order_country: {
      type: String,
      trim: true,
    },
    order_type: {
      type: String,
      enum: ['In-House', 'Takeaway', 'Delivery', 'Pre-Order', 'Other'],
      default: 'In-House',
    },
    order_source: {
      type: String,
      enum: ['Organic', 'Zomato', 'Swiggy', 'Magic-Pin', 'Other'],
      default: 'Organic',
    },
    order_note: {
      type: String,
      trim: true,
    },
    order_payment_source: {
      type: String,
      enum: ['Cash', 'Credit/Debit Card', 'Online Transaction', 'Other'],
      default: 'Cash',
      trim: true,
    },
    grand_total: {
      type: Number,
      required: true,
    },
    order_products: [
      {
        product_id: {
          type: mongoose.Schema.ObjectId,
          ref: 'menuitem',
          required: true,
          trim: true,
        },
        product_name: {
          type: String,
          required: true,
          trim: true,
        },
        product_category: {
          type: String,
          required: true,
          trim: true,
        },
        quantity: {
          type: String,
          trim: true,
          default: '',
        },
        quantity_count: {
          type: Number,
          default: 1,
        },
        amount: {
          type: Number,
          default: 0,
        },
        discount: {
          type: Number,
          default: 0,
        },
      },
    ],
    order_delivery_charges: {
      type: Number,
      trim: true,
    },
    send_notifications: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('order', schema)
