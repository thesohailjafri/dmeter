import axios from 'axios'
import endpoints from './_endpoints'

export const getCustomerCartApi = async (payload) => {
  try {
    return await axios.get(endpoints.customer.cart, { payload })
  } catch (error) {
    return error.response
  }
}

export const updateCustomerCartApi = async (operation, payload) => {
  try {
    return await axios.post(endpoints.customer.cart, { operation, ...payload })
  } catch (error) {
    return error.response
  }
}
