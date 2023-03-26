import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { getMyselfApi } from '../api'
import { AuthLoader } from '../components'

import {
  customerEmailAtom,
  customerFirstnameAtom,
  customerIdAtom,
  customerLastnameAtom,
  customerPhoneAtom,
} from '../recoil/atoms/customerAtom'
import { useCallback } from 'react'

export default function AuthWrapper({ children }) {
  const [authing, setAuthing] = useState(false)
  const setCustomerFirstname = useSetRecoilState(customerFirstnameAtom)
  const setCustomerLastname = useSetRecoilState(customerLastnameAtom)
  const setCustomerEmail = useSetRecoilState(customerEmailAtom)
  const setCustomerPhone = useSetRecoilState(customerPhoneAtom)
  const setCustomerId = useSetRecoilState(customerIdAtom)
  const fetchMe = useCallback(async () => {
    const res = await getMyselfApi()
    if (res) {
      if (res.status === 200) {
        setCustomerId(res?.data?._id)
        setCustomerFirstname(res?.data?.name?.first)
        setCustomerLastname(res?.data?.name?.last)
        setCustomerPhone(res?.data?.phone)
        setCustomerEmail(res?.data?.email)
      } else {
        setCustomerId('')
        setCustomerFirstname('')
        setCustomerLastname('')
        setCustomerPhone('')
        setCustomerEmail('')
      }
      setAuthing(false)
    }
  }, [])
  useEffect(() => fetchMe(), [fetchMe])

  return authing ? <AuthLoader /> : <div>{children}</div>
}
