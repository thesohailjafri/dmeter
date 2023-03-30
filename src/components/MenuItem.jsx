import React, { useState } from 'react'

import { motion } from 'framer-motion'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { customerIdAtom } from '../recoil/atoms/customerAtom'
import {
  isOpenLoginPopUpAtom,
  loginPopUpMsgAtom,
} from '../recoil/atoms/loginAtom'
import { updateCustomerCartApi } from '../api'
import { Button } from 'primereact/button'
import { cartAtom, cartItemCountAtom } from '../recoil/atoms/cartAtom'
export default function MenuItem({
  isHeroCard = false,
  branch_id,
  id,
  thumbnail,
  name,
  category,
  prices,
}) {
  prices = prices.sort(function (a, b) {
    return a.amount - b.amount
  })
  const minAmountItem = prices[0]
  const customerID = useRecoilValue(customerIdAtom)
  const setLoginPopUp = useSetRecoilState(isOpenLoginPopUpAtom)
  const setLoginPopUpMsg = useSetRecoilState(loginPopUpMsgAtom)
  const setCartAtom = useSetRecoilState(cartAtom)

  const [loading, setLoading] = useState(false)
  const addItemToCart = async (price) => {
    if (!customerID) {
      setLoginPopUpMsg('Please sign-in before adding item to your cart')
      setLoginPopUp(true)
      return
    }
    setLoading(true)
    const { quantity, amount, discount } = price
    const res = await updateCustomerCartApi('addItem', {
      branch_id,
      product_id: id,
      product_name: name,
      product_category: category,
      quantity,
      amount,
      discount,
    })
    if (res) {
      setLoading(false)
      if (res.status === 201) {
        setCartAtom(res.data)
      }
    }
  }
  if (isHeroCard) {
    return (
      <div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          key={id}
          // className="h-full p-4 bg-red-100 backdrop-blur-md rounded-3xl flex flex-col drop-shadow-lg"
          className="h-full lg:w-190 xl:w-200 p-4 bg-cardOverlay backdrop-blur-md drop-shadow-lg rounded-3xl flex flex-col "
        >
          <img
            src={
              'https://res.cloudinary.com/dhvfvo2yb/image/upload/v1664997220/' +
              thumbnail
            }
            alt=""
            className="rounded-2xl overflow-hiddens"
          />

          <div className="">
            <h6 className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
              {name}
            </h6>
            <p className="text-sm opacity-75">{category}</p>
            <div className="mt-2 flex flex-col gap-2 justify-center">
              <div className="flex justify-between items-center">
                <span>{minAmountItem?.quantity}</span>
                <span className="">₹{minAmountItem?.amount}</span>
                <span>
                  <Button
                    onClick={() => addItemToCart(minAmountItem)}
                    className="cursor-pointer text-2xl bg-gradient-to-br from-orange-400 to-orange-500 font-semibold w-8 h-8 rounded m-0 text-white"
                    label="+"
                    disabled={loading}
                  />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        key={id}
        className="h-full p-4 bg-orange-100 backdrop-blur-md rounded-3xl flex flex-col drop-shadow-lg"
      >
        <img
          src={
            'https://res.cloudinary.com/dhvfvo2yb/image/upload/v1664997220/' +
            thumbnail
          }
          alt=""
          className="rounded-2xl overflow-hiddens"
        />

        <div className="">
          <h6 className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
            {name}
          </h6>
          <p className="text-sm opacity-75">{category}</p>
          <div className="mt-2 flex flex-col gap-2 justify-center">
            {prices &&
              prices.map((price, idx) => {
                return (
                  <div className="flex justify-between items-center">
                    <span>{price?.quantity}</span>
                    <span className="">₹{price?.amount}</span>
                    <span>
                      <Button
                        onClick={() => addItemToCart(price)}
                        className="cursor-pointer text-2xl bg-gradient-to-br from-orange-400 to-orange-500 font-semibold w-8 h-8 rounded m-0 text-white"
                        label="+"
                        disabled={loading}
                      />
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
