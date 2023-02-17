import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import NotFound from '../img/NotFound.svg'

const RowContainer = ({ flag, data, scrollValue }) => {
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
    <div
      ref={rowContainer}
      className={`w-full  my-12 scroll-smooth  ${
        flag
          ? 'overflow-x-scroll scrollbar-none'
          : 'overflow-x-hidden flex-wrap justify-center'
      }`}
    >
      {data && data.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mx-auto">
          {data.map((item) => (
            <div key={item?.id} className="bg-cardOverlay rounded-lg p-4">
              {/* <motion.div
                className="w-full h-full object-contain"
                // whileHover={{ scale: 1.2 }}
              > */}
              <img
                src={
                  'https://res.cloudinary.com/dhvfvo2yb/image/upload/v1664997220/' +
                  item?.thumbnail
                }
                alt=""
                className="w-full h-auto rounded-lg overflow-hidden"
              />
              {/* </motion.div> */}

              <div className="w-full flex flex-col items-end justify-end mt-3">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item?.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {item?.category_id?.name}
                </p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    {item?.prices &&
                      item?.prices.map((price, idx) => {
                        return (
                          <div>
                            <span className="text-sm text-red-500">₹</span>{' '}
                            {price?.amount}
                          </div>
                        )
                      })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  )
}

export default RowContainer
