import axios from 'axios'
import endpoints from './_endpoints'

export const getRestaurantUsingSlugApi = async (slug) => {
  try {
    return await axios.get(endpoints.restaurant.slug + slug)
  } catch (error) {
    return error.response
  }
}

export const getRestaurantsApi = async () => {
  try {
    return await axios.get(endpoints.restaurant.index)
  } catch (error) {
    return error.response
  }
}
