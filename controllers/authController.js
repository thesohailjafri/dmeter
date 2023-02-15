const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const UserModel = require('../models/UserModel')
const { createTokenUser, generateJWT } = require('../helpers/jwt/generate')
const RestaurantModel = require('../models/RestaurantModel')

const loginStaffMember = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new error.BadRequestError('Please provide email and password')
  }
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new error.BadRequestError('Account do not exist')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new error.BadRequestError('Password incorrect')
  }
  const restaurant = await RestaurantModel.findById(user.restaurant_id).select(
    'restaurant_name',
  )
  const restaurant_name = restaurant.restaurant_name
  const userToken = createTokenUser(user, restaurant_name)
  const token = generateJWT({
    payload: userToken,
  })
  res.status(StatusCodes.OK).json({
    msg: 'Login Successful',
    user: userToken,
    token,
  })
}

const getMe = async (req, res) => {
  res.status(StatusCodes.OK).json({
    ...req.user,
  })
}

// make verify otp ctrler

module.exports = {
  loginStaffMember,
  getMe,
}
