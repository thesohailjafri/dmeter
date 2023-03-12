import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HomeContainer, MenuContainer } from '../components'
import { useParams } from 'react-router-dom'
import { getBranchUsingSlugApi, getMenuCategories } from '../api'
import HeroBg from '../img/heroBg.png'
import { heroData } from '../utils/data'
import Delivery from '../img/delivery.png'

const BranchPage = () => {
  const params = useParams()
  const { slug } = params
  const [branch, setBranch] = useState({})
  const [categories, setCategories] = useState([])

  const [branch_id, setBranchId] = useState('')

  useEffect(() => {
    if (!slug) return
    const getData = async () => {
      const res = await getBranchUsingSlugApi(slug)
      if (res) {
        if (res.status === 200) {
          setBranch(res.data.branch)
          setBranchId(res.data.branch._id)
        }
      }
    }
    getData()
  }, [slug])

  useEffect(() => {
    if (!branch_id) return
    const getData = async () => {
      const res = await getMenuCategories({
        branch_id,
        field: `name`,
      })
      if (res) {
        if (res.status === 200) {
          setCategories(res.data.records)
        }
      }
    }
    getData()
  }, [branch_id])

  useEffect(() => {
    document.title = 'Branch Page'
  }, [])

  useEffect(() => {
    console.log({ branch })
  }, [branch])

  return (
    <div className="h-auto flex flex-col items-center justify-center ">
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
        id="home"
      >
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
            <p className="text-base text-orange-500 font-semibold">
              Bike Delivery
            </p>
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
              <img
                src={Delivery}
                className="w-full h-full object-contain"
                alt="delivery"
              />
            </div>
          </div>

          <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            {branch?.restaurant_id?.restaurant_name || 'Restaurant'} (
            <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
              {branch?.branch_name || 'Branch'}
            </span>
            )
          </p>

          <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
            {branch?.restaurant_id?.restaurant_name}({branch?.branch_name}), is
            a true hero in the culinary world, serving up authentic cuisine
            using the finest ingredients and traditional techniques. With a
            focus on freshness and customer satisfaction, it's a branch of the
            popular {branch?.restaurant_id?.restaurant_name} restaurant chain.
          </p>

          <button
            type="button"
            className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            Open Cart
          </button>
        </div>
        <div className="hidden py-2 flex-1 md:flex items-center relative">
          <img
            src={HeroBg}
            className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
            alt="hero-bg"
          />

          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap">
            {heroData &&
              heroData.map((n) => (
                <div
                  key={n.id}
                  className="  xl:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={n.imageSrc}
                    className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                    alt="I1"
                  />
                  <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                    {n.name}
                  </p>

                  <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                    {n.decp}
                  </p>

                  <p className="text-sm font-semibold text-headingColor">
                    <span className="text-xs text-red-600">₹</span> {n.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <MenuContainer categories={categories} />
    </div>
  )
}

export default BranchPage
