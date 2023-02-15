const { StatusCodes } = require('http-status-codes')
const error = require('../errors')
const { addMenuitem } = require('../helpers/utils/AddMenuitem')
const { uploadMedia } = require('../helpers/utils/UploadMedia')
const { promisifyFormParse } = require('../helpers/utils/MultipartForm')
const short_uuid = require('short-uuid')
const BranchModel = require('../models/BranchModel')
const CategoryModel = require('../models/CategoryModel')
const MenuitemModel = require('../models/MenuitemModel')

const postMenuitem = async (req, res) => {
  const [fields, files] = await promisifyFormParse(req)
  let { branchId, menuitem } = fields
  const { restaurant_id } = req.user
  if (!branchId || !restaurant_id) {
    throw new error.BadRequestError('branch_id and restaurant_id are required')
  }
  menuitem = JSON.parse(menuitem)
  let { thumbnail, images } = files
  if (!thumbnail) {
    throw new error.BadRequestError('Thumbnail is requried')
  }
  // upload thumbnail
  const _thumbnail = await uploadMedia({
    path: thumbnail[0]?.path,
    folder: `dmeter/images/menuitems/${branchId}_${short_uuid.generate()}`,
  })
  menuitem.thumbnail = _thumbnail.path
  // upload images
  const _images = []
  if (images) {
    await Promise.all(
      await images.map(async (image) => {
        const res = await uploadMedia({
          path: image?.path,
          folder: `dmeter/images/menuitems/${branchId}_${short_uuid.generate()}`,
        })
        _images.push(res.path)
      }),
    )
  }
  menuitem.images = _images
  // add menuitem
  const add = await addMenuitem({
    menuitem,
    branch_id: branchId,
    restaurant_id,
  })
  const record = await MenuitemModel.findById(add._id)
    .populate({ path: 'category_id', select: 'name' })
    .populate({ path: 'branch_id', select: 'branch_name' })
  const branch = await BranchModel.findById(branchId).select({
    branch_name: 1,
  })
  res.status(StatusCodes.CREATED).json({
    msg: `${menuitem.name} added to branch menu of ${branch.branch_name}`,
    restaurant_id,
    branch_id: branchId,
    record,
  })
}

const getMenu = async (req, res) => {
  let { fields, branch_id, restaurant_id } = req.query
  if (!restaurant_id) {
    throw new error.BadRequestError('Restaurant id is requried')
  }
  const filter = {}
  if (restaurant_id) filter.restaurant_id = restaurant_id
  if (branch_id) filter.branch_id = branch_id

  const records = await MenuitemModel.find(filter)
    .select(fields)
    .populate({ path: 'category_id', select: 'name' })
    .populate({ path: 'branch_id', select: 'branch_name' })
  res.status(StatusCodes.OK).json({
    restaurant_id,
    branch_id,
    fields,
    records,
  })
}

const getMenuitem = async (req, res) => {
  const { id } = req.params
  const { fields, restaurant_id } = req.body

  if (!restaurant_id || !id) {
    throw new error.BadRequestError('Incompleted data')
  }

  const menuitem = await MenuitemModel.findOne({
    restaurant_id,
    _id: id,
  }).select(fields)

  res.status(StatusCodes.OK).json({
    restaurant_id,
    fields,
    menuitem,
  })
}

const deleteMenuitem = async (req, res) => {
  const { id } = req.params
  const { restaurant_id } = req.user

  if (!restaurant_id || !id) {
    throw new error.BadRequestError('Incompleted data')
  }

  const record = await MenuitemModel.deleteOne({
    restaurant_id,
    _id: id,
  })
  res.status(StatusCodes.OK).json({
    msg: 'Menuitem deleted',
    restaurant_id,
    id,
    record,
  })
}

const postMenuCategory = async (req, res) => {
  let { branch_id, name, description } = req.body
  const { restaurant_id } = req.user
  if (!branch_id || !restaurant_id) {
    throw new error.BadRequestError('branch_id and restaurant_id are required')
  }
  const recordExist = await CategoryModel.findOne({
    branch_id,
    restaurant_id,
    name,
  })
  if (recordExist) {
    throw new error.BadRequestError(`Category already exist`)
  }
  const record = await CategoryModel.create({
    branch_id,
    name,
    description,
    restaurant_id,
  })
  res.status(StatusCodes.CREATED).json({
    msg: `Added menu category`,
    restaurant_id,
    branch_id,
    record,
  })
}

const getMenuCategories = async (req, res) => {
  let { fields, branch_id, restaurant_id } = req.query
  if (!restaurant_id) {
    throw new error.BadRequestError('Restaurant id is requried')
  }
  const filter = {}
  if (restaurant_id) filter.restaurant_id = restaurant_id
  if (branch_id) filter.branch_id = branch_id

  const records = await CategoryModel.find(filter)
    .select(fields)
    .populate({ path: 'branch_id', select: 'branch_name' })

  res.status(StatusCodes.OK).json({
    restaurant_id,
    branch_id,
    fields,
    records,
  })
}

const deleteMenuCategory = async (req, res) => {
  const { id } = req.params
  const { restaurant_id } = req.user

  if (!restaurant_id || !id) {
    throw new error.BadRequestError('Incompleted data')
  }

  const record = await CategoryModel.deleteOne({
    restaurant_id,
    _id: id,
  })
  res.status(StatusCodes.OK).json({
    msg: 'Menu category deleted',
    restaurant_id,
    id,
    record,
  })
}

module.exports = {
  postMenuitem,
  getMenu,
  getMenuitem,
  postMenuCategory,
  getMenuCategories,
  deleteMenuitem,
  deleteMenuCategory,
}
