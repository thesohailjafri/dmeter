import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

const toastParams = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}
export default function AxiosInterpector({ children }) {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + localStorage.getItem('customer_token')
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.patch['Content-Type'] = 'application/json'
  axios.defaults.headers.put['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.delete['Content-Type'] = 'application/json'
  axios.interceptors.response.use(
    (res) => {
      // Add configurations here
      if (res.data.msg) {
        toast.success(res.data.msg, toastParams)
      }
      return res
    },
    (err) => {
      if (err.response.data.msg) {
        if (err.response.status >= 500) {
          toast.error(err.response.data.msg, toastParams)
        } else if (err.response.status >= 400) {
          toast.warn(err.response.data.msg, toastParams)
        }
      }
      return Promise.reject(err)
    },
  )
  return (
    <div>
      <ToastContainer />
      {children}
    </div>
  )
}
