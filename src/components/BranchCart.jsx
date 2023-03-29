import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { RiRefreshFill } from 'react-icons/ri'

import { motion } from 'framer-motion'

import EmptyCart from '../img/emptyCart.svg'
import CartItem from './CartItem'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { cartAtom, showCartAtom } from '../recoil/atoms/cartAtom'
import { Dialog } from '@headlessui/react'
import { customerIdAtom } from '../recoil/atoms/customerAtom'
import { isOpenLoginPopUpAtom } from '../recoil/atoms/loginAtom'
import { useCallback } from 'react'
import { updateCustomerCartApi } from '../api'

const CartContainer = ({ branch_id }) => {
  const customerId = useRecoilValue(customerIdAtom)
  const user = false
  const [showCart, setShowCart] = useRecoilState(showCartAtom)
  const [cart, setCart] = useRecoilState(cartAtom)
  const [subtotal, setSubtotal] = useState(0)

  const setIsOpenLoginPopUp = useSetRecoilState(isOpenLoginPopUpAtom)

  const handleShowCart = () => {
    setShowCart(true)
  }

  const handleClearCart = async () => {
    const res = await updateCustomerCartApi('clearItems', { branch_id })
    if (res) {
      if (res.status === 201) {
        setCart(res.data)
      }
    }
  }

  const handleCloseCart = () => {
    setShowCart(false)
  }
  const calculateTotal = useCallback(() => {
    if (!cart.products) {
      return
    }
    let _subtotal = 0
    cart.products.forEach((p) => (_subtotal += p.amount * p.quantity_count))
    setSubtotal(_subtotal)
  }, [cart])
  useEffect(() => calculateTotal(), [calculateTotal])
  return (
    <Dialog open={showCart} onClose={() => handleCloseCart()}>
      <Dialog.Panel>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className=" fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
        >
          <div className="w-full flex items-center justify-between p-4 cursor-pointer">
            <motion.div whileTap={{ scale: 0.75 }} onClick={handleCloseCart}>
              <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
            </motion.div>
            <p className="text-textColor text-lg font-semibold">Cart</p>

            <motion.p
              whileTap={{ scale: 0.75 }}
              className="flex items-center gap-2 p-1 px-2 my-2 bg-orange-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
              onClick={handleClearCart}
            >
              Clear <RiRefreshFill />
            </motion.p>
          </div>

          {/* bottom section */}
          {!customerId ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <img src={EmptyCart} className="w-300" alt="" />
              <button
                className="calltoaction-btn"
                onClick={() => setIsOpenLoginPopUp(true)}
              >
                Sign-in to add items in cart
              </button>
            </div>
          ) : cart?.products && cart?.products.length > 0 ? (
            <div className="w-full h-full bg-orange-900 text-white rounded-t-[2rem] flex flex-col">
              {/* cart Items section */}
              <div className="w-full h-600 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                {/* cart Item */}
                {cart?.products &&
                  cart?.products.length > 0 &&
                  cart?.products.map((product) => (
                    <CartItem product={product} branch_id={branch_id} />
                  ))}
              </div>

              {/* cart total section */}
              <div className="w-full flex-1 bg-black bg-opacity-30 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                <div className="w-full flex items-center justify-between">
                  <p className=" text-lg">Sub Total</p>
                  <p className=" text-lg"> ₹{subtotal}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className=" text-lg">Delivery</p>
                  <p className=" text-lg"> ₹25</p>
                </div>

                <div className="w-full border-b border-gray-600 my-2"></div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-gray-200 text-xl font-semibold">Total</p>
                  <p className="text-gray-200 text-xl font-semibold">
                    ₹{subtotal + 25}
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="calltoaction-btn"
                >
                  Check Out
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <img src={EmptyCart} className="w-300" alt="" />
              <p className="text-xl text-textColor font-semibold">
                Add some items to your cart
              </p>
            </div>
          )}
        </motion.div>
      </Dialog.Panel>
    </Dialog>
  )
}

export default CartContainer
