const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const RestaurantModel = require('../models/RestaurantModel')
const { createTokenUser } = require('../helpers/jwt/generate')
const { addAddress } = require('../helpers/utils/AddAddress')
const { addUser } = require('../helpers/utils/AddUser')
const shortid = require('shortid')
const BranchModel = require('../models/BranchModel')
shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
)

const registerRestaurant = async (req, res) => {
  // take restaurant details
  // take restaurant address details
  // take owner details
  // mark the restaurant registration is completed
  const {
    restaurant_name,
    restaurant_aboutus,
    restaurant_address,
    owner,
    owner_address,
  } = req.body
  if (
    !restaurant_name ||
    !restaurant_aboutus ||
    !restaurant_address ||
    !owner ||
    !owner_address
  ) {
    throw new error.BadRequestError('Restaurant and owner details are required')
  }
  // save restaurant  address
  const _restaurant_address = await addAddress({
    address: restaurant_address,
    entity: 'restaurant',
  })
  // save restaurant details
  const short_id = shortid.generate()
  const restaurant_slug = `${restaurant_name}-${short_id}`.replaceAll(' ', '_')
  const restaurant = await RestaurantModel.create({
    short_id,
    restaurant_slug,
    restaurant_name,
    restaurant_aboutus,
    restaurant_address: _restaurant_address._id,
  })
  // save owner address
  const _owner_address = await addAddress({
    address: owner_address,
    entity: 'owner',
  })
  // save user->owner
  owner.position = 'owner'
  owner.address_id = _owner_address._id
  owner.restaurant_id = restaurant._id
  const _owner = await addUser(owner)
  // save address
  // update restaurant
  await RestaurantModel.findByIdAndUpdate(restaurant._id, {
    owner: _owner._id,
  })

  res.status(StatusCodes.CREATED).json({
    msg: 'Restaurant registered successfully',
    restaurant: restaurant,
    owner: createTokenUser(_owner),
  })
}

const getRestaurantUsingSlug = async (req, res) => {
  const { slug: restaurant_slug } = req.params
  if (!restaurant_slug) {
    throw new error.BadRequestError('slug is required')
  }
  const restaurant = await RestaurantModel.findOne({
    restaurant_slug,
  }).populate('restaurant_address')
  if (!restaurant) {
    throw new error.NotFoundError('Restaurant not found')
  }
  const branches = await BranchModel.find({
    restaurant_id: restaurant._id,
  }).populate('branch_address')
  res.status(StatusCodes.OK).json({
    restaurant,
    branches,
  })
}

const getRestaurants = async (_, res) => {
  const restaurants = await RestaurantModel.find().populate(
    'restaurant_address',
  )
  if (!restaurants) {
    throw new error.NotFoundError('Restaurant not found')
  }

  res.status(StatusCodes.OK).json({
    restaurants,
  })
}
module.exports = {
  registerRestaurant,
  getRestaurantUsingSlug,
  getRestaurants,
}
