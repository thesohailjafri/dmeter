import axios from 'axios'
import endpoints from './_endpoints'

export const getMenuCategories = async (payload) => {
  try {
    return await axios.get(endpoints.menu.category, { params: payload })
  } catch (error) {
    return error.response
  }
}

export const getMenu = async (payload) => {
  try {
    return await axios.get(endpoints.menu.index, { params: payload })
  } catch (error) {
    return error.response
  }
}
