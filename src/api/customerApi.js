import axios from 'axios'
import endpoints from './_endpoints'

export const customerCartUpdate = async (operation, payload) => {
  try {
    return await axios.get(endpoints.customer.cart + operation, payload)
  } catch (error) {
    return error.response
  }
}
