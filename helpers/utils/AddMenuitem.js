const MenuitemModel = require('../../models/MenuitemModel')
const error = require('../../errors')
const addMenuitem = async ({ menuitem, restaurant_id, branch_id }) => {
  if (!restaurant_id || !branch_id) {
    throw new error.BadRequestError('Restaurant and branch ids are required')
  }
  const {
    name,
    description,
    thumbnail,
    images,
    prices,
    diet,
    alternateNames,
    ingredients,
    allergens,
    category_id,
  } = menuitem

  if (
    !name ||
    !category_id ||
    !thumbnail ||
    !diet ||
    !images.length === 0 ||
    !prices.length === 0
  ) {
    throw new error.BadRequestError(
      'Menuitem name, description, thumbnail, images and prices are requried',
    )
  }

  const _menuitem = await MenuitemModel.create({
    name,
    description,
    alternateNames,
    ingredients,
    allergens,
    thumbnail,
    images,
    prices,
    diet,
    restaurant_id,
    branch_id,
    category_id,
  })

  return _menuitem
}

module.exports = {
  addMenuitem,
}
