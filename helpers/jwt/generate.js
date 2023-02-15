const jwt = require('jsonwebtoken')

const generateJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
  return token
}

const createTokenUser = (user, restaurant_name) => {
  const token = {
    _id: user._id,
    name: user.name,
    position: user.position,
    phone: user.phone,
    email: user.email,
    address_id: user.address_id,
    restaurant_id: user.restaurant_id,
    restaurant_name: restaurant_name,
    branch_id: user.branch_id,
  }
  return token
}

module.exports = {
  generateJWT,
  createTokenUser,
}
