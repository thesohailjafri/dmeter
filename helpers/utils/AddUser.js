const UserModel = require('../../models/UserModel')
const error = require('../../errors')
const addUser = async (user) => {
  const {
    email,
    firstname,
    lastname,
    phone,
    password,
    position,
    address_id,
    restaurant_id,
    branch_id,
  } = user
  if (
    !email ||
    !firstname ||
    !lastname ||
    !phone ||
    !password ||
    !position ||
    !address_id ||
    !restaurant_id
  ) {
    throw new error.BadRequestError('Owner details are incomplete')
  }
  const _user = await UserModel.create({
    name: {
      first: firstname,
      last: lastname,
    },
    email,
    password,
    position,
    phone,
    address_id,
    restaurant_id,
    branch_id,
  })

  return _user
}

module.exports = {
  addUser,
}
