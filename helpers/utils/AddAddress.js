const AddressModel = require('../../models/AddressModel')
const BranchAddressModel = require('../../models/BranchAddressModel')
const error = require('../../errors')

const addAddress = async ({ address, entity = '' }) => {
  // add user address
  const { addressline, pincode, city, state, country } = address

  if (!addressline || !pincode || !city || !state || !country) {
    throw new error.BadRequestError(
      `${entity} address details are incomplete`.trim(),
    )
  }
  const _address = await AddressModel.create({
    addressline,
    pincode,
    city,
    state,
    country,
  })
  return _address
}

const addBranchAddress = async (address) => {
  // add branch address
  const { addressline, phone, pincode, city, state, country, google_location } =
    address

  if (
    !addressline ||
    !phone ||
    !pincode ||
    !city ||
    !state ||
    !country ||
    !google_location
  ) {
    throw new error.BadRequestError('Branch address details are incomplete')
  }
  const _address = await BranchAddressModel.create({
    addressline,
    phone,
    pincode,
    city,
    state,
    country,
    google_location,
  })
  return _address
}

module.exports = {
  addBranchAddress,
  addAddress,
}
