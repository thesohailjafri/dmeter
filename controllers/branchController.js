const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const RestaurantModel = require('../models/RestaurantModel')

const { addAddress, addBranchAddress } = require('../helpers/utils/AddAddress')
const { addUser } = require('../helpers/utils/AddUser')
const BranchModel = require('../models/BranchModel')
const UserModel = require('../models/UserModel')
const BranchAddressModel = require('../models/BranchAddressModel')
const AddressModel = require('../models/AddressModel')
const shortid = require('shortid')
shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
)

const registerBranch = async (req, res) => {
  const { branch, restaurant_id } = req.body

  if (!restaurant_id || !branch) {
    throw new error.BadRequestError(
      'Incomplete branch details and restaurant id',
    )
  }
  // check if restaurant exist in system
  const ifRestaurantExist = await RestaurantModel.findById(restaurant_id)
  if (!ifRestaurantExist) {
    throw new error.BadRequestError('Restaurant does not exist')
  }
  const ifMangerExist = await UserModel.findOne({
    email: branch.manager.email,
  }).select({
    email: 1,
  })
  if (ifMangerExist) {
    throw new error.BadRequestError(
      `${branch.branch_name} Manager email already exist`,
    )
  }
  const ifBranchExist = await BranchModel.findOne({
    restaurant_id,
    branch_name: branch.branch_name,
  }).select({
    branch_name: 1,
  })
  if (ifBranchExist) {
    throw new error.BadRequestError('Branch name already exist')
  }

  const { branch_name, branch_address, manager, manager_address } = branch
  if (!branch_name || !branch_address || !manager || !manager_address) {
    throw new error.BadRequestError('Incomplete branche details')
  }
  // add branch address
  const _branch_address = await addBranchAddress(branch_address)
  // add manager address
  const _manager_address = await addAddress({
    address: manager_address,
    entity: 'manager',
  })
  const short_id = shortid.generate()
  const resturant = await RestaurantModel.findById(restaurant_id).select(
    'restaurant_name',
  )
  const branch_slug =
    `${resturant.restaurant_name}-${branch_name}-${short_id}`.replaceAll(
      ' ',
      '_',
    )
  // save branch
  const _branch = await BranchModel.create({
    short_id,
    branch_slug,
    branch_name,
    restaurant_id,
    branch_address: _branch_address._id,
  })
  // add manager
  manager.position = 'manager'
  manager.restaurant_id = restaurant_id
  manager.address_id = _manager_address._id
  manager.branch_id = _branch._id
  const _manager = await addUser(manager)

  res.status(StatusCodes.CREATED).json({
    msg: `${branch_name} Branch registered successfully`,
    restaurant_id,
    branch: _branch,
    manager: _manager,
  })
}

const getBranches = async (req, res) => {
  const { restaurant_id, fields } = req.query

  if (!restaurant_id) {
    throw new error.BadRequestError('Restaurant id is required')
  }
  const ifRestaurantExist = await RestaurantModel.findById(restaurant_id)
  if (!ifRestaurantExist) {
    throw new error.BadRequestError('Restaurant does not exist')
  }
  const branches = await BranchModel.find({ restaurant_id })
    .select(fields)
    .sort('-updatedAt')
  res.status(StatusCodes.OK).json({
    branches,
  })
}

const getBranch = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new error.BadRequestError('Branch id is required')
  }
  const branch = await BranchModel.findById(id)
  if (!branch) {
    throw new error.NotFoundError('Branch not found')
  }
  if (branch.restaurant_id.toString() !== req.user.restaurant_id) {
    throw new error.NotFoundError('Branch not found')
  }
  const branch_address = await BranchAddressModel.findById(
    branch?.branch_address,
  )
  const manager = await UserModel.findOne({
    branch_id: branch?._id,
  })
  const manager_address = await AddressModel.findById(manager?.address_id)
  res.status(StatusCodes.OK).json({
    branch,
    branch_address,
    manager,
    manager_address,
  })
}

const getBranchMenuitems = async (req, res) => {
  const { id } = req.params
  const { restaurant_id } = req.user
  if (!restaurant_id || !id) {
    throw new error.BadRequestError('Restaurant id and branch id is required')
  }
  const isBranchExist = await BranchModel.findOne({
    _id: id,
    restaurant_id: restaurant_id,
  })
  if (!isBranchExist) {
    throw new error.NotFoundError('Branch does not exist')
  }
  const menu = await MenuitemModel.find({
    branch_id: id,
  }).select({
    prices: 0,
  })
  res.status(StatusCodes.OK).json({
    menu,
  })
}

const getBranchUsingSlug = async (req, res) => {
  const { slug: branch_slug } = req.params
  if (!branch_slug) {
    throw new error.BadRequestError('slug is required')
  }
  const branch = await BranchModel.findOne({ branch_slug }).populate(
    'restaurant_id',
  )
  if (!branch) {
    throw new error.NotFoundError('Branch not found')
  }

  res.status(StatusCodes.OK).json({
    branch,
  })
}

module.exports = {
  registerBranch,
  getBranches,
  getBranch,
  getBranchMenuitems,
  getBranchUsingSlug,
}
