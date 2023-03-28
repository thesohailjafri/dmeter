import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../img/NotFound.svg'

const RowContainer = ({ flag, menuItems, scrollValue }) => {
  const rowContainer = useRef()
  const cartItems = []
  const [items, setItems] = useState([])

  const addtocart = () => {
    localStorage.setItem('cartItems', JSON.stringify(items))
  }

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue
  }, [scrollValue])

  useEffect(() => {
    addtocart()
  }, [items])

  return (
    <div ref={rowContainer} className="w-full my-12 scroll-smooth ">
      {menuItems && menuItems.length > 0 ? (
        <div className="container grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mx-auto">
          {menuItems.map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={item?.id}
              className="p-4  bg-red-100 backdrop-blur-md rounded-3xl flex flex-col drop-shadow-lg"
            >
              <img
                src={
                  'https://res.cloudinary.com/dhvfvo2yb/image/upload/v1664997220/' +
                  item?.thumbnail
                }
                alt=""
                className="rounded-lg overflow-hiddens"
              />

              <div className="">
                <h6 className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {item?.name}
                </h6>
                <p className="text-sm opacity-75">{item?.category_id?.name}</p>
                <div className="mt-2 flex flex-col gap-2 justify-center">
                  {item?.prices &&
                    item?.prices.map((price, idx) => {
                      return (
                        <div className="flex justify-between">
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
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img alt="Not Found" src={NotFound} className="h-150" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  )
}

export default RowContainer
