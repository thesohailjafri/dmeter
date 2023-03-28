import React from 'react'
import { BsFillMapFill, BsTelephoneOutboundFill } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
export default function BranchCard({
  restaurant_name,
  branch_name,
  branch_slug,
  phone,
  google_location,
  addressline,
  city,
  state,
}) {
  return (
    <Link to={`/branch/${branch_slug}`}>
      <div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          key={branch_slug}
          className="cursor-pointer h-full p-4 md:p-6 bg-cardOverlay backdrop-blur-md rounded-3xl drop-shadow-lg"
        >
          <div className="grid gap-3">
            <div>
              <h6 className="text-xl lg:text-2xl font-semibold text-textColor">
                {restaurant_name}(
                <span className="text-orange-600">{branch_name}</span>)
              </h6>
            </div>
            <div>
              <p className="text-textColor">{addressline}</p>
              <p className="text-orange-600">
                {city}, {state}
              </p>
            </div>
            <ul className="">
              {phone &&
                Array.isArray(phone) &&
                phone.map((phone) => (
                  <li>
                    <a href={`tel:${phone}`}>
                      <span className="flex items-center gap-2 py-1 rounded-full">
                        <BsTelephoneOutboundFill />
                        <span className="text-base text-orange-500 font-semibold">
                          {phone}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              {google_location && (
                <li>
                  <a href={google_location}>
                    <span className="flex items-center gap-2 py-1 rounded-full">
                      <BsFillMapFill />
                      <span className="text-base text-orange-500 font-semibold">
                        Location
                      </span>
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </Link>
  )
}
