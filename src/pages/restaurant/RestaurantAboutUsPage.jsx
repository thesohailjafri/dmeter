import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBranchUsingSlugApi, getRestaurantUsingSlugApi } from '../../api'
import { BranchCard, BranchHeader, RestaurantHeader } from '../../components'
import { BsTelephoneOutboundFill, BsFillMapFill } from 'react-icons/bs'
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact'
import { useRef } from 'react'
import NotFound from '../../img/NotFound.svg'

export default function BranchAboutUsPage() {
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
      <div>
        <div className="w-full">
          <div id="abouttheresturant">
            <p className="my-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              About{' '}
              <span className="text-orange-600">
                {restaurant?.restaurant_name}
              </span>
            </p>
            <p>{restaurant?.restaurant_aboutus}</p>
          </div>
        </div>
      </div>
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
  )
}
