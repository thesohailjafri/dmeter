import React from 'react'

import { motion } from 'framer-motion'

export default function HeroMenuitem({
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

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        key={id}
        // className="h-full p-4 bg-red-100 backdrop-blur-md rounded-3xl flex flex-col drop-shadow-lg"
        className="h-full lg:w-190 xl:w-200 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col drop-shadow-lg"
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
                <button className="px-2 py-1 cursor-pointer bg-gradient-to-br from-orange-400 to-orange-500 font-semibold rounded m-0 text-white">
                  +
                </button>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// <div
//   key={n.id}
//   className="  xl:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
// >
//   <img src={n.imageSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20 " alt="I1" />
//   <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
//     {n.name}
//   </p>

//   <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
//     {n.decp}
//   </p>

//   <p className="text-sm font-semibold text-headingColor">
//     <span className="text-xs text-red-600">₹</span> {n.price}
//   </p>
// </div>
