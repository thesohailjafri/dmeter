const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const UserModel = require('../models/UserModel')
const {
  createTokenUser,
  generateJWT,
  createTokenCustomer,
} = require('../helpers/jwt/generate')
const RestaurantModel = require('../models/RestaurantModel')
const CustomerModel = require('../models/CustomerModel')

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

const getUser = async (req, res) => {
  res.status(StatusCodes.OK).json({
    ...req.user,
  })
}

const signinCustomer = async (req, res) => {
  const { phone, password } = req.body
  if (!phone || !password) {
    throw new error.BadRequestError('Please provide phone and password')
  }
  const customer = await UserModel.findOne({ phone }).select({
    phone: 1,
  })
  if (!customer) {
    throw new error.BadRequestError('Account do not exist')
  }
  const isPasswordCorrect = await customer.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new error.BadRequestError('Password incorrect')
  }

  const customerToken = createTokenCustomer(customer)
  const token = generateJWT({
    payload: customerToken,
  })
  res.status(StatusCodes.OK).json({
    msg: 'Login Successful',
    customer: customerToken,
    token,
  })
}

const signupCustomer = async (req, res) => {
  const { firstname, lastname, phone, email, password } = req.body
  if (!firstname || !lastname || !phone || !password) {
    throw new error.BadRequestError('Please provide name, phone and password')
  }
  const exist = await CustomerModel.findOne({ phone }).select({
    phone: 1,
  })
  if (exist) {
    throw new error.BadRequestError('Phone number is already register with us')
  }
  const customer = await CustomerModel.create({
    name: {
      first: firstname,
      last: lastname,
    },
    email,
    password,
    phone,
  })
  res.status(StatusCodes.OK).json({
    msg: 'Registration Successful',
    customer,
  })
}

const getCustomer = async (req, res) => {
  res.status(StatusCodes.OK).json({
    ...req.customer,
  })
}

// make verify otp ctrler

module.exports = {
  loginStaffMember,
  getUser,
  getCustomer,
  signinCustomer,
  signupCustomer,
}
