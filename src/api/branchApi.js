import axios from 'axios'
import endpoints from './_endpoints'

export const getBranchesApi = async (payload) => {
  try {
    return await axios.get(endpoints.branch.index, {
      params: payload,
    })
  } catch (error) {
    return error.response
  }
}

export const getBranchApi = async (id) => {
  try {
    return await axios.get(endpoints.branch.index + id)
  } catch (error) {
    return error.response
  }
}

export const getBranchUsingSlugApi = async (slug) => {
  try {
    return await axios.get(endpoints.branch.slug + slug)
  } catch (error) {
    return error.response
  }
}
