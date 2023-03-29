const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const BranchModel = require('../models/BranchModel')
const CartModel = require('../models/CartModel')

const customerCartOperation = async (req, res) => {
  const { branch_id, menuitem_id, operation } = req.body
  if (!operation || !branch_id) {
    throw new error.BadRequestError('Operation and branch-id is required')
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
  if (!cart) {
    cart = await CartModel.create({
      customer_id,
      branch_id,
      restaurant_id: branch.restaurant_id,
    })
  }
  // add item
  if (operation === 'addItem') {
    let itemIndex = cart.items.findIndex((p) => p.menuitem_id == menuitem_id)
    if (itemIndex > -1) {
      //product exists in the cart, update the quantity
      let item = cart.items[itemIndex]
      item.quantity++
      cart.items[itemIndex] = item
    } else {
      //product does not exists in cart, add new item
      cart.items.push({ menuitem_id, quantity })
      cart = await cart.save()
      return res.status(StatusCodes.CREATED).json(cart)
    }
  }
  // remove item
  if (operation === 'removeItem') {
    let itemIndex = cart.items.findIndex((p) => p.menuitem_id == menuitem_id)
    if (itemIndex > -1) {
      //product exists in the cart, update the quantity
      let item = cart.items[itemIndex]
      item.quantity--
      cart.items[itemIndex] = item
    }
    cart.items = cart.items.filter((i) => i.quantity > 0)
    cart = await cart.save()
    return res.status(StatusCodes.CREATED).json(cart)
  }
  // clear item
  if (operation === 'clearItems') {
    cart.items = []
    cart = await cart.save()
    return res.status(StatusCodes.CREATED).json(cart)
  }
  res.status(StatusCodes.CREATED).json({ msg: 'Operation not supported' })
}

module.exports = {
  customerCartOperation,
}
