import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { getRestaurantsApi } from '../api'
import { Header, RestaurantCard } from '../components'
import Logo from '../img/logo.png'
import NotFound from '../img/NotFound.svg'

export default function RestaurantsPage() {
  const [records, setRecords] = useState([])

  const fetchRecords = useCallback(async () => {
    const res = await getRestaurantsApi()
    if (res) {
      if (res.status === 200) {
        setRecords(res.data.restaurants)
      }
    }
  }, [])
  useEffect(() => fetchRecords(), [fetchRecords])

  return (
    <div className="mt-10">
      <Header />
      <div className="grid gap-8">
        <div className="">
          <h2 className="text-3xl mb-8 flex justify-center items-center gap-3 font-extrabold text-headingColor sm:text-4xl md:text-5xl">
            <img className="w-12 object-cover" src={Logo} alt="DMeter Logo" />
            <span className="block">Our Restaurants</span>
          </h2>
        </div>
        <section id="restaurants">
          {records && records.length > 0 ? (
            <div className="container grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mx-auto">
              {records.map((r) => (
                <RestaurantCard
                  restaurant_name={r.restaurant_name}
                  restaurant_slug={r.restaurant_slug}
                  addressline={r.restaurant_address.addressline}
                  city={r.restaurant_address.city}
                  state={r.restaurant_address.state}
                  country={r.restaurant_address.country}
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
        </section>
      </div>
    </div>
  )
}
