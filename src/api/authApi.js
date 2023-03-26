import axios from 'axios'
import endpoints from './_endpoints'

export const signinApi = async (payload) => {
  try {
    return await axios.post(endpoints.auth.index, payload)
  } catch (error) {
    return error.response
  }
}

export const signupApi = async (payload) => {
  try {
    return await axios.post(endpoints.auth.signup, payload)
  } catch (error) {
    return error.response
  }
}

export const getMyselfApi = async () => {
  try {
    return await axios.get(endpoints.auth.index)
  } catch (error) {
    return error.response
  }
}
