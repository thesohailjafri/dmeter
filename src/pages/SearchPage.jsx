import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchResturantAndBranchApi } from '../api'
import { BranchCard, Header, RestaurantCard, Searchbar } from '../components'
import NotFound from '../img/NotFound.svg'

export default function SearchPage() {
  let [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
  const [records, setRecords] = useState({
    restaurant: [],
    branches: [],
  })

  const fetchRecords = useCallback(async () => {
    if (!keyword) return
    const res = await searchResturantAndBranchApi(keyword)
    if (res) {
      if (res.status === 200) {
        setRecords(res.data)
      }
    }
  }, [keyword])

  useEffect(() => fetchRecords(), [fetchRecords])
  return (
    <div>
      <Header showSearch={false} />
      <section className="my-4 lg:my-10">
        <Searchbar />
      </section>
      <section id="restaurant">
        <p className="my-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Restaurant
        </p>
        {records.restaurant && records.restaurant.length > 0 ? (
          <div className="container grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mx-auto">
            {records.restaurant.map((r) => (
              <RestaurantCard
                restaurant_name={r.restaurant_name}
                restaurant_slug={r.restaurant_slug}
                addressline={r.restaurant_address.addressline}
                city={r.restaurant_address.city}
                state={r.restaurant_address.state}
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
      <section id="branch">
        <p className="my-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Branches
        </p>

        {records.branches && records.branches.length > 0 ? (
          <div className="container grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mx-auto">
            {records.branches.map((b) => (
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
      </section>
    </div>
  )
}
