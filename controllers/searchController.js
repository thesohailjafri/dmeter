const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const BranchModel = require('../models/BranchModel')
const RestaurantModel = require('../models/RestaurantModel')

const searchResturantAndBranches = async (req, res) => {
  const { keyword } = req.params
  if (!keyword) {
    throw new error.BadRequestError('Keyword is required')
  }

  const [resturants, branches] = await Promise.all([
    await RestaurantModel.find({
      restaurant_name: { $regex: keyword, $options: 'i' },
    }).select('restaurant_name restaurant_slug'),
    await BranchModel.find({
      branch_name: { $regex: keyword, $options: 'i' },
    }).select('branch_slug branch_name'),
  ])

  res.status(StatusCodes.OK).json({
    resturants,
    branches,
  })
}

module.exports = {
  searchResturantAndBranches,
}
