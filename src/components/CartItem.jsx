import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { updateCustomerCartApi } from '../api'
import { customerIdAtom } from '../recoil/atoms/customerAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartAtom } from '../recoil/atoms/cartAtom'
import classNames from 'classnames'
let items = []

const CartItem = ({ product, branch_id, checkoutElement = false }) => {
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
    <div
      className={classNames(
        'w-full px-4 py-2 rounded-lg  flex items-center justify-between gap-2',
        {
          'bg-orange-700': !checkoutElement,
        },
        {
          'bg-white': checkoutElement,
        },
      )}
    >
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base">
          {product_name}({quantity})
        </p>
        <p
          className={classNames('text-md block font-semibold', {
            'text-orange-100': !checkoutElement,
          })}
        >
          ₹{amount}
        </p>
      </div>

      {/* button section */}
      <div
        className={classNames('flex gap-2', {
          'flex-col items-center ': !checkoutElement,
          'items-end gap-4': checkoutElement,
        })}
      >
        <div className="group flex gap-2 mt-1 cursor-pointer">
          <motion.button
            whileTap={{ scale: 0.75 }}
            onClick={() => updateItem('removeItem')}
          >
            <BiMinus className=" " />
          </motion.button>

          <p
            className={classNames(
              'w-10 h-6 rounded flex items-center  justify-center',
              {
                'bg-orange-800': !checkoutElement,
              },
              {
                'border-orange-100 border-1 border': checkoutElement,
              },
            )}
          >
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
          <p
            className={classNames('text-md block font-semibold', {
              'text-orange-100': !checkoutElement,
            })}
          >
            ₹{parseFloat(amount) * quantity_count}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
