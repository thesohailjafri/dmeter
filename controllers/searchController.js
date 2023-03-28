const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const BranchModel = require('../models/BranchModel')
const RestaurantModel = require('../models/RestaurantModel')

const searchResturantAndBranches = async (req, res) => {
  const { keyword } = req.params
  if (!keyword) {
    throw new error.BadRequestError('Keyword is required')
  }
  console.log({ keyword })
  const [restaurant, branches] = await Promise.all([
    await RestaurantModel.find({ $text: { $search: keyword } }).populate(
      'restaurant_address',
    ),
    await BranchModel.find({ $text: { $search: keyword } })
      .populate('restaurant_id')
      .populate('branch_address'),
  ])

  res.status(StatusCodes.OK).json({
    restaurant,
    branches,
  })
}

module.exports = {
  searchResturantAndBranches,
}
