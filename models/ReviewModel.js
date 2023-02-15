const mongoose = require('mongoose')

const schema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
      required: true,
    },
    menuitem: {
      type: mongoose.Schema.ObjectId,
      ref: 'Menuitem',
      required: true,
    },
  },
  { timestamps: true },
)

schema.index({ menuitem: 1, customer: 1 }, { unique: true })

// schema.statics.calculateAverageRating = async function (productId) {
//   const result = await this.aggregate([
//     { $match: { product: productId } },
//     {
//       $group: {
//         _id: null,
//         averageRating: { $avg: '$rating' },
//         numOfReviews: { $sum: 1 },
//       },
//     },
//   ])

//   try {
//     await this.model('Product').findOneAndUpdate(
//       { _id: productId },
//       {
//         averageRating: Math.ceil(result[0]?.averageRating || 0),
//         numOfReviews: result[0]?.numOfReviews || 0,
//       },
//     )
//   } catch (error) {
//     console.log(error)
//   }
// }

// schema.post('save', async function () {
//   await this.constructor.calculateAverageRating(this.product)
// })

// schema.post('remove', async function () {
//   await this.constructor.calculateAverageRating(this.product)
// })

module.exports = mongoose.model('reviews', schema)
