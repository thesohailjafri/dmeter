import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { getBranchUsingSlugApi } from '../../api'
import { BranchHeader } from '../../components'
import { cartAtom } from '../../recoil/atoms/cartAtom'

export default function BranchOrdersPage() {
  const params = useParams()
  const { branch_slug } = params
  const [branch_id, setBranchId] = useState('')
  const [branch, setBranch] = useState({})
  const [branchAddress, setBranchAddress] = useState({})
  const setCartAtom = useSetRecoilState(cartAtom)
  useEffect(() => {
    if (!branch_slug) return
    const getData = async () => {
      const res = await getBranchUsingSlugApi(branch_slug)
      if (res) {
        if (res.status === 200) {
          setBranch(res.data.branch)
          setBranchAddress(res.data.branch_address)
          setBranchId(res.data.branch._id)
          setCartAtom(res.data.cart)
        }
      }
    }
    getData()
  }, [branch_slug])
  return (
    <div>
      <BranchHeader
        restaurantName={branch?.restaurant_id?.restaurant_name}
        branchName={branch?.branch_name}
        branch_slug={branch_slug}
        branch_id={branch_id}
      />
    </div>
  )
}
