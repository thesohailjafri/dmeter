import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBranchUsingSlugApi } from '../../api'
import { BranchHeader } from '../../components'
import { BsTelephoneOutboundFill, BsFillMapFill } from 'react-icons/bs'
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact'
import { cartAtom } from '../../recoil/atoms/cartAtom'
import { useSetRecoilState } from 'recoil'

export default function BranchAboutUsPage() {
  const params = useParams()
  const { branch_slug } = params
  const [branch_id, setBranchId] = useState('')
  const [branch, setBranch] = useState({})
  const [branchAddress, setBranchAddress] = useState({})
  const setCartAtom = useSetRecoilState(cartAtom)

  useEffect(() => {
    if (!branch_slug) return
    const getData = async () => {
      const res = await getBranchUsingSlugApi(branch_slug)
      if (res) {
        if (res.status === 200) {
          setBranch(res.data.branch)
          setBranchAddress(res.data.branch_address)
          setBranchId(res.data.branch._id)
          setCartAtom(res.data.cart)
        }
      }
    }
    getData()
  }, [branch_slug])
  return (
    <div>
      <BranchHeader
        restaurantName={branch?.restaurant_id?.restaurant_name}
        branchName={branch?.branch_name}
        branch_slug={branch_slug}
        branch_id={branch_id}
      />
      <div>
        <div className="w-full">
          <div id="abouttheresturant">
            <p className="my-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              About{' '}
              <span className="text-orange-600">
                {branch?.restaurant_id?.restaurant_name}
              </span>
            </p>
            <p>
              {branch?.restaurant_id?.restaurant_aboutus && (
                <ReadMoreReact
                  text={branch?.restaurant_id?.restaurant_aboutus}
                  min={300}
                  ideal={500}
                  max={1000}
                  readMoreText={'...read more'}
                  buttonColor="text-orange-600"
                />
              )}
            </p>
          </div>
          <div id="aboutthebranch">
            <p className="my-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              About{' '}
              <span className="text-orange-600">{branch?.branch_name}</span>{' '}
              Branch
            </p>
            <p>
              {branch?.branch_aboutus && (
                <ReadMoreReact
                  text={branch?.branch_aboutus}
                  min={300}
                  ideal={500}
                  max={1000}
                  readMoreText={'...read more'}
                  buttonColor="text-orange-600"
                />
              )}
            </p>
          </div>
          <div id="contact">
            <p className="my-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              Reach Out
            </p>
            <div className="flex flex-wrap gap-3">
              {branchAddress?.phone &&
                Array.isArray(branchAddress.phone) &&
                branchAddress.phone.map((phone) => (
                  <a href={`tel:${phone}`}>
                    <span className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                      <BsTelephoneOutboundFill />
                      <span className="text-base text-orange-500 font-semibold">
                        {phone}
                      </span>
                    </span>
                  </a>
                ))}
              {branchAddress?.google_location && (
                <a href={branchAddress?.google_location}>
                  <span className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                    <BsFillMapFill />
                    <span className="text-base text-orange-500 font-semibold">
                      Location
                    </span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
