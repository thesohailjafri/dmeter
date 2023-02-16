const RestaurantModel = require('../models/RestaurantModel')

const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const { addAddress } = require('../helpers/utils/AddAddress')
const { addUser } = require('../helpers/utils/AddUser')
const BranchModel = require('../models/BranchModel')
const UserModel = require('../models/UserModel')

const registerStaffMember = async (req, res) => {
  const { member_details, member_address, branch_id } = req.body
  const { restaurant_id } = req.user
  if (!restaurant_id || !branch_id || !member_address || !member_details) {
    throw new error.BadRequestError('Incomplete member details')
  }
  const ifRestaurantExist = await RestaurantModel.findById(restaurant_id)
  if (!ifRestaurantExist) {
    throw new error.BadRequestError('Restaurant does not exist')
  }
  // check if branch exist
  const ifBranchExist = await BranchModel.findById(branch_id)
  if (!ifBranchExist) {
    throw new error.BadRequestError('Branch does not exist')
  }
  const ifUserExist = await UserModel.findOne({
    email: member_details.email,
  }).select({
    email: 1,
  })
  if (ifUserExist) {
    throw new error.BadRequestError(`Email already registered`)
  }
  // add staff member address
  const _member_address = await addAddress({
    address: member_address,
    entity: 'staff member',
  })
  // add staff member
  member_details.address_id = _member_address._id
  member_details.restaurant_id = restaurant_id
  member_details.branch_id = branch_id
  const _member = await addUser(member_details)
  const staffMember = await UserModel.findById(_member._id).select({
    password: 0,
  })
  res.status(StatusCodes.CREATED).json({
    msg: 'Staff member registered successfully',
    restaurant_id,
    branch_id,
    member: _member,
    member_address: _member_address,
    staffMember,
  })
}

const getStaffMembers = async (req, res) => {
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
  const staff = await UserModel.find({
    branch_id: id,
  }).select({
    password: 0,
  })
  res.status(StatusCodes.OK).json({
    staff,
  })
}

const getAllStaffMembers = async (req, res) => {
  const { restaurant_id } = req.user
  if (!restaurant_id) {
    throw new error.BadRequestError('Restaurant id required')
  }
  const staff = await UserModel.find({
    restaurant_id,
    position: { $ne: 'OWNER' },
  })
    .select({
      password: 0,
    })
    .populate('branch_id')
    .sort('-updatedAt')

  res.status(StatusCodes.OK).json({
    staff,
  })
}

const deleteStaffCategory = async (req, res) => {
  const { id } = req.params
  const { restaurant_id } = req.user

  if (!restaurant_id || !id) {
    throw new error.BadRequestError('Incompleted data')
  }
  const exist = await UserModel.findOne({
    restaurant_id,
    _id: id,
  }).select('position')
  if (!exist) {
    throw new error.NotFoundError('User not found')
  }
  if (['owner', 'manager'].includes(exist.position)) {
    throw new error.BadRequestError('Owner/manager can not be deleted')
  }
  const record = await UserModel.deleteOne({
    restaurant_id,
    _id: id,
  })
  res.status(StatusCodes.OK).json({
    msg: 'User deleted',
    restaurant_id,
    id,
    record,
  })
}

module.exports = {
  registerStaffMember,
  getStaffMembers,
  getAllStaffMembers,
  deleteStaffCategory,
}
