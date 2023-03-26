import React from 'react'

import { motion } from 'framer-motion'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { customerIdAtom } from '../recoil/atoms/customerAtom'
import { isOpenLoginPopUpAtom } from '../recoil/atoms/loginAtom'

export default function MenuItem({
  branch_id,
  id,
  thumbnail,
  name,
  category,
  prices,
}) {
  const [customerID, setCustomerID] = useRecoilState(customerIdAtom)
  const setLoginPopUp = useSetRecoilState(isOpenLoginPopUpAtom)
  const addItemToCart = () => {
    if (!customerID) {
      setLoginPopUp(true)
    }
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
                      <button className="cursor-pointer bg-gradient-to-br from-orange-400 to-orange-500 font-semibold w-6 h-6 rounded m-0 text-white">
                        +
                      </button>
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
