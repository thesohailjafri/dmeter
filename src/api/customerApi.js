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

export const postCustomerOrderApi = async (payload) => {
  try {
    return await axios.post(endpoints.customer.order, payload)
  } catch (error) {
    return error.response
  }
}

export const getCustomerOrdersApi = async (query) => {
  try {
    return await axios.get(endpoints.customer.order, { params: query })
  } catch (error) {
    return error.response
  }
}

export const getCustomerOrderApi = async (id) => {
  try {
    return await axios.get(endpoints.customer.order + id)
  } catch (error) {
    return error.response
  }
}
