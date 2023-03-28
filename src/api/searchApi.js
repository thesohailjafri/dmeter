import axios from 'axios'
import endpoints from './_endpoints'

export const searchResturantAndBranchApi = async (keyword) => {
  try {
    return await axios.get(endpoints.search.rnb + keyword)
  } catch (error) {
    return error.response
  }
}
