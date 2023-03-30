import backend_api from './_backend_api'

const endpoints = {
  auth: {
    index: `${backend_api}/auth/customer/`,
    signup: `${backend_api}/auth/customer/signup/`,
  },
  restaurant: {
    index: `${backend_api}/restaurant/`,
    slug: `${backend_api}/restaurant/slug/`,
  },
  branch: {
    index: `${backend_api}/branch/`,
    slug: `${backend_api}/branch/slug/`,
    menu: `${backend_api}/branch/menu/`,
  },
  staff: {
    index: `${backend_api}/staff/`,
  },
  order: {
    index: `${backend_api}/order/`,
  },
  menu: {
    index: `${backend_api}/menu/`,
    category: `${backend_api}/menu/category/`,
  },
  search: {
    index: `${backend_api}/search/`,
    rnb: `${backend_api}/search/rnb/`,
  },
  customer: {
    index: `${backend_api}/customer/`,
    cart: `${backend_api}/customer/cart/`,
    order: `${backend_api}/customer/order/`,
  },
}
export default endpoints
