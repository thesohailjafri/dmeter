import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { updateCustomerCartApi } from '../api'
import { customerIdAtom } from '../recoil/atoms/customerAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartAtom } from '../recoil/atoms/cartAtom'
let items = []

const CartItem = ({ product, branch_id }) => {
  const {
    product_id,
    product_name,
    product_category,
    quantity,
    quantity_count,
    amount,
    discount,
  } = product
  const setCart = useSetRecoilState(cartAtom)
  const [loading, setLoading] = useState(false)
  const updateItem = async (operation) => {
    setLoading(true)
    const res = await updateCustomerCartApi(operation, {
      branch_id,
      product_id,
      product_name,
      product_category,
      quantity,
      amount,
      discount,
    })
    if (res) {
      setLoading(false)
      if (res.status === 201) {
        setCart(res.data)
      }
    }
  }

  return (
    <div className="w-full px-4 py-2 rounded-lg bg-orange-700 flex items-center justify-between gap-2">
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base">{product_name}</p>
        <p className="text-md block text-orange-100 font-semibold">₹{amount}</p>
      </div>

      {/* button section */}
      <div className="flex flex-col items-center gap-2 ">
        <div className="group flex gap-2 ml-auto cursor-pointer">
          <motion.button
            whileTap={{ scale: 0.75 }}
            onClick={() => updateItem('removeItem')}
          >
            <BiMinus className=" " />
          </motion.button>

          <p className="w-10 h-6 rounded-sm bg-orange-900  flex items-center justify-center">
            {quantity_count}
          </p>

          <motion.button
            whileTap={{ scale: 0.75 }}
            onClick={() => updateItem('addItem')}
          >
            <BiPlus className=" " />
          </motion.button>
        </div>
        <div>
          <p className="text-md block text-orange-100 font-semibold">
            ₹{parseFloat(amount) * quantity_count}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
