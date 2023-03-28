import React from 'react'
import { motion } from 'framer-motion'
export default function HeroTestimonial({
  username,
  restaurant_name,
  review,
  review_title,
  date,
}) {
  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        key={username}
        // className="h-full p-4 bg-red-100 backdrop-blur-md rounded-3xl flex flex-col drop-shadow-lg"
        className="h-full md:w-190 lg:w-200 xl:w-225 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col drop-shadow-lg"
      >
        <div className="">
          <h6 className="text-base lg:text-xl font-semibold text-textColor">
            {username}
          </h6>
          <p className="text-sm opacity-75 mb-1 underline underline-offset-2 decoration-orange-600">
            {restaurant_name}
          </p>

          <p className="text-sm opacity-50 mb-2">{date}</p>
          <h6 className=" text-orange-600 font-bold mb-2">{review_title}</h6>
          <p className="text-textColor">
            <span className="text-orange-600">"</span>
            {review}
            <span className="text-orange-600">"</span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
