const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const BranchModel = require('../models/BranchModel')
const CartModel = require('../models/CartModel')

const updateCustomerCart = async (req, res) => {
  const { branch_id, operation } = req.body
  if (!operation || !branch_id) {
    throw new error.BadRequestError('Operation and branch-id is required')
  }
  const branch = await BranchModel.findById(branch_id).select({
    restaurant_id: true,
  })
  if (!branch) {
    throw new error.BadRequestError('Branch does not exist')
  }
  const { _id: customer_id } = req.customer
  // get or create cart
  let cart = await CartModel.findOne({
    customer_id,
    branch_id,
    restaurant_id: branch.restaurant_id,
  })
  if (!cart) {
    cart = await CartModel.create({
      customer_id,
      branch_id,
      restaurant_id: branch.restaurant_id,
    })
  }
  // add item
  if (operation === 'addItem') {
    const {
      product_id,
      product_name,
      product_category,
      quantity,
      amount,
      discount,
    } = req.body

    const itemIndex = cart.products.findIndex(
      (p) => p.product_id == product_id && p.quantity === quantity,
    )
    if (itemIndex > -1) {
      //product exists in the cart, update the quantity
      let item = cart.products[itemIndex]
      item.quantity_count = item.quantity_count + 1
      cart.products[itemIndex] = item
    } else {
      //product does not exists in cart, add new item
      cart.products.push({
        product_id,
        product_name,
        product_category,
        quantity,
        quantity_count: 1,
        amount,
        discount,
      })
    }
    cart = await cart.save()
    return res.status(StatusCodes.CREATED).json(cart)
  }
  // remove item
  if (operation === 'removeItem') {
    const { product_id } = req.body

    let itemIndex = cart.products.findIndex((p) => p.product_id == product_id)
    if (itemIndex > -1) {
      //product exists in the cart, update the quantity_count
      let item = cart.products[itemIndex]
      item.quantity_count--
      cart.products[itemIndex] = item
    }
    cart.products = cart.products.filter((i) => i.quantity_count > 0)
    cart = await cart.save()
    return res.status(StatusCodes.CREATED).json(cart)
  }
  // clear item
  if (operation === 'clearItems') {
    cart.products = []
    cart = await cart.save()
    return res.status(StatusCodes.CREATED).json(cart)
  }
  res.status(StatusCodes.CREATED).json({ msg: 'Operation not supported' })
}

const getCustomerCart = async (req, res) => {
  const { branch_id } = req.body
  if (!branch_id) {
    throw new error.BadRequestError('Branch-id is required')
  }
  const branch = await BranchModel.findById(branch_id).select({
    restaurant_id: true,
  })
  if (!branch) {
    throw new error.BadRequestError('Branch does not exist')
  }
  const { customer_id } = req.customer
  // get or create cart
  let cart = await CartModel.findOne({
    customer_id,
    branch_id,
    restaurant_id: branch.restaurant_id,
  })

  res.status(StatusCodes.OK).json(cart)
}

module.exports = {
  updateCustomerCart,
  getCustomerCart,
}
