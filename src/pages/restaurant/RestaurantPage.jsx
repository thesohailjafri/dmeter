import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRestaurantUsingSlugApi } from '../../api'
import { BranchCard, RestaurantHeader } from '../../components'
import { motion } from 'framer-motion'
import HeroBg from '../../img/restaurant_orange_500_fade.png'

import Delivery from '../../img/delivery.png'
import { IoFastFood } from 'react-icons/io5'
import NotFound from '../../img/NotFound.svg'
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact'
import { BsTelephoneOutboundFill } from 'react-icons/bs'
import { IoMdBasket } from 'react-icons/io'
import { useRef } from 'react'

export default function RestaurantPage() {
  const rowContainer = useRef()

  const params = useParams()
  const { restaurant_slug } = params
  const [branches, setBranches] = useState([])
  const [restaurant, setRestaurant] = useState({})
  const [restaurantAddress, setRestaurantAddress] = useState({})
  useEffect(() => {
    if (!restaurant_slug) return
    const getData = async () => {
      const res = await getRestaurantUsingSlugApi(restaurant_slug)
      if (res) {
        if (res.status === 200) {
          console.log(res.data)
          setRestaurant(res.data.restaurant)
          setRestaurantAddress(res.data.restaurant.restaurant_address)

          setBranches(res.data.branches)
        }
      }
    }
    getData()
  }, [restaurant_slug])
  return (
    <div>
      <RestaurantHeader
        restaurantName={restaurant?.restaurant_name}
        restaurant_slug={restaurant_slug}
      />
      <div className="h-auto flex flex-col items-center justify-center ">
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
          id="home"
        >
          <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
            <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
              {restaurant?.restaurant_name || 'Restaurant'}
            </p>
            <p>
              <span className="text-orange-600">Address: </span>
              {restaurantAddress?.addressline}
            </p>

            <p className="text-base text-textColor md:text-left md:w-[80%]">
              {restaurant?.restaurant_aboutus && (
                <ReadMoreReact
                  text={restaurant?.restaurant_aboutus}
                  min={100}
                  ideal={150}
                  max={300}
                  readMoreText={'...read more'}
                  buttonColor="text-orange-600"
                />
              )}
            </p>
          </div>
          <div className="hidden py-2 flex-1 md:flex items-center relative">
            <img
              src={HeroBg}
              className=" ml-auto h-420 w-full lg:w-auto lg:h-650 opacity-60 object-contain"
              alt="hero-bg"
            />
          </div>
        </section>

        <section className="w-full my-6" id="menu">
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
              Our Branches
            </p>

            <div className="w-full">
              <div ref={rowContainer} className="w-full my-12 scroll-smooth ">
                {branches && branches.length > 0 ? (
                  <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto">
                    {branches.map((b) => (
                      <BranchCard
                        restaurant_name={b.restaurant_id.restaurant_name}
                        branch_name={b.branch_name}
                        branch_slug={b.branch_slug}
                        phone={b.branch_address.phone}
                        google_location={b.branch_address.google_location}
                        addressline={b.branch_address.addressline}
                        city={b.branch_address.city}
                        state={b.branch_address.state}
                      />
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
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
