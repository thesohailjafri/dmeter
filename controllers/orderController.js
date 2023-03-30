const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const BranchModel = require('../models/BranchModel')
const OrderModel = require('../models/OrderModel')

const postOrderManual = async (req, res) => {
  let {
    branch_id,
    order_address,
    order_city,
    order_state,
    order_country,
    order_type,
    order_source,
    order_note,
    order_delivery_charges,
    customer_name,
    customer_phone,
    order_products,
    send_notifications,
    order_payment_source,
    grand_total,
    sub_total,
    order_status = 'Placed',
  } = req.body
  const { restaurant_id } = req.user
  if (!branch_id || !restaurant_id) {
    throw new error.BadRequestError('branch_id and restaurant_id are required')
  }
  const recordExist = await BranchModel.findOne({
    _id: branch_id,
    restaurant_id,
  })
  if (!recordExist) {
    throw new error.BadRequestError(`Branch does not exist`)
  }
  const record = await OrderModel.create({
    order_address,
    order_city,
    order_state,
    order_country,
    order_type,
    order_source,
    order_note,
    order_delivery_charges,
    customer_name,
    customer_phone,
    send_notifications,
    order_payment_source,
    order_products,
    grand_total,
    sub_total,
    order_status,
    branch_id,
    restaurant_id,
  })

  res.status(StatusCodes.CREATED).json({
    msg: 'Order Added',
    branch_id,
    restaurant_id,
    record,
  })
}

const getOrders = async (req, res) => {
  let { fields, branch_id } = req.query
  const { restaurant_id } = req.user
  if (!restaurant_id) {
    throw new error.BadRequestError('Restaurant id is requried')
  }
  const filter = {}
  if (restaurant_id) filter.restaurant_id = restaurant_id
  if (branch_id) filter.branch_id = branch_id

  const records = await OrderModel.find(filter)
    .select(fields)
    .populate('branch_id')
    .sort('-updatedAt')

  res.status(StatusCodes.OK).json({
    records,
  })
}

const getOrder = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new error.BadRequestError('Id id required')
  }
  const order = await OrderModel.findById(id)
  res.status(StatusCodes.OK).json({
    order,
  })
}

const postOrderCustomer = async (req, res) => {
  let {
    branch_id,
    order_address,
    order_city,
    order_state,
    order_country,
    order_type,
    order_source = 'Org-Site',
    order_note,
    order_delivery_charges,
    customer_name,
    customer_phone,
    order_products,
    send_notifications,
    order_payment_source,
    grand_total,
    sub_total,
    order_status = 'Placed',
  } = req.body
  const { _id: customer_id } = req.customer
  if (!branch_id || !customer_id) {
    throw new error.BadRequestError('branch_id and customer_id are required')
  }
  const branch = await BranchModel.findById(branch_id)
  if (!branch) {
    throw new error.BadRequestError(`Branch does not exist`)
  }
  const restaurant_id = branch.restaurant_id
  const order = await OrderModel.create({
    order_address,
    order_city,
    order_state,
    order_country,
    order_type,
    order_source,
    order_note,
    order_delivery_charges,
    customer_name,
    customer_phone,
    send_notifications,
    order_payment_source,
    order_products,
    grand_total,
    sub_total,
    order_status,
    branch_id,
    restaurant_id,
    customer_id,
  })

  res.status(StatusCodes.CREATED).json({
    msg: 'Order Placed',
    branch_id,
    restaurant_id,
    order,
  })
}

const getCustomerOrders = async (req, res) => {
  let { fields } = req.query
  const { _id: customer_id } = req.customer
  if (!customer_id) {
    throw new error.BadRequestError('Customer id is requried')
  }
  const filter = {
    customer_id,
  }

  const records = await OrderModel.find(filter)
    .select(fields)
    .populate('branch_id')
    .populate('restaurant_id')
    .sort('-updatedAt')

  res.status(StatusCodes.OK).json({
    records,
  })
}

const updateOrder = async (req, res) => {
  const { id } = req.params
  if (!id) {
    throw new error.BadRequestError('Id id required')
  }
  const { key, value } = req.body
  let order = await OrderModel.findById(id)
  order[key] = value
  order = await order.save()
  res.status(StatusCodes.OK).json({
    msg: 'Order updated',
    order,
  })
}

module.exports = {
  postOrderManual,
  getOrders,
  postOrderCustomer,
  getCustomerOrders,
  getOrder,
  updateOrder,
}
