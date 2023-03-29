import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
export default function RestaurantCard({
  restaurant_name,
  restaurant_slug,
  addressline,
  city,
  state,
  country,
}) {
  return (
    <div>
      <Link to={`/restaurant/${restaurant_slug}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          key={restaurant_slug}
          className="cursor-pointer h-full p-4 md:p-6 bg-cardOverlay backdrop-blur-md rounded-3xl drop-shadow-lg"
        >
          <div className="grid gap-3">
            <div>
              <h6 className="text-xl lg:text-2xl font-semibold text-textColor">
                {restaurant_name}
              </h6>
            </div>
            <div>
              <p className="text-textColor">{addressline}</p>
              <p className="text-orange-600">
                {city}, {state}, {country}
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}
