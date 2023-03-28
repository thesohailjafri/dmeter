import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BranchHeader,
  HeroMenuitem,
  HomeContainer,
  MenuContainer,
  MenuItem,
} from '../../components'
import { useParams } from 'react-router-dom'
import { getBranchUsingSlugApi, getMenu, getMenuCategories } from '../../api'
import HeroBg from '../../img/heroBg.png'
import { heroData } from '../../utils/data'
import Delivery from '../../img/delivery.png'
import { IoFastFood } from 'react-icons/io5'
import NotFound from '../../img/NotFound.svg'
import ReadMoreReact from 'read-more-react/dist/components/ReadMoreReact'
import { BsTelephoneOutboundFill } from 'react-icons/bs'
import { IoMdBasket } from 'react-icons/io'
import { showCartAtom } from '../../recoil/atoms/cartAtom'
import { useSetRecoilState } from 'recoil'
const BranchPage = () => {
  const params = useParams()
  const { branch_slug } = params
  const [branch_id, setBranchId] = useState('')
  const [branch, setBranch] = useState({})
  const [branchAddress, setBranchAddress] = useState({})
  const setShowCart = useSetRecoilState(showCartAtom)

  const [heroMenuItem, setHeroMenuItem] = useState([])

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({})
  const [menuItems, setMenuItems] = useState([])
  const rowContainer = useRef()

  useEffect(() => {
    if (!branch_slug) return
    const getData = async () => {
      const res = await getBranchUsingSlugApi(branch_slug)
      if (res) {
        if (res.status === 200) {
          setBranch(res.data.branch)
          setBranchAddress(res.data.branch_address)
          setBranchId(res.data.branch._id)
          setHeroMenuItem(res.data.featuredItems)
        }
      }
    }
    getData()
  }, [branch_slug])

  useEffect(() => {
    if (!category || !category?.branch_id?._id || !category?._id) {
      return
    }
    const getData = async () => {
      const res = await getMenu({
        branch_id: category?.branch_id?._id,
        category_id: category?._id,
      })
      if (res) {
        if (res.status === 200) {
          setMenuItems(res.data.records)
        }
      }
    }
    getData()
  }, [category])

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
          setCategory(res.data.records[0])
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
    <div className="">
      <BranchHeader
        restaurantName={branch?.restaurant_id?.restaurant_name}
        branchName={branch?.branch_name}
        homeUrl={`/branch/${branch_slug}`}
        menuUrl={`/menu/${branch_slug}`}
        aboutUsUrl={`/about/${branch_slug}`}
        orderUrl={`/orders/${branch_slug}`}
      />
      <div className="h-auto flex flex-col items-center justify-center ">
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
          id="home"
        >
          <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
            {branch?.delivery && (
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
            )}

            <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
              {branch?.restaurant_id?.restaurant_name || 'Restaurant'} (
              <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
                {branch?.branch_name || 'Branch'}
              </span>
              )
            </p>

            <p>
              {branchAddress?.phone && Array.isArray(branchAddress.phone) && (
                <div className="flex flex-wrap gap-3">
                  {branchAddress.phone.map((phone) => (
                    <a href={`tel:${phone}`}>
                      <span className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
                        <BsTelephoneOutboundFill />
                        <span className="text-base text-orange-500 font-semibold">
                          {phone}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </p>

            <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
              {branch?.branch_aboutus && (
                <ReadMoreReact
                  text={branch?.branch_aboutus}
                  min={100}
                  ideal={150}
                  max={300}
                  readMoreText={'...read more'}
                  buttonColor="text-orange-600"
                />
              )}
            </p>

            <button
              className="calltoaction-btn"
              onClick={() => setShowCart(true)}
            >
              <IoMdBasket />
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
              {heroMenuItem.map((item) => (
                <HeroMenuitem
                  branch_id={branch_id}
                  id={item?.id}
                  thumbnail={item?.thumbnail}
                  name={item?.name}
                  category={item?.category_id?.name}
                  prices={item?.prices}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full my-6" id="menu">
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
              Menu
            </p>

            <div className="w-full flex flex-wrap items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
              {categories &&
                categories.map((_category) => (
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    key={_category._id}
                    className={`group ${
                      category._id === _category._id
                        ? 'bg-cartNumBg'
                        : 'bg-card'
                    } w-28 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                    onClick={() => setCategory(_category)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full shadow-lg ${
                        category._id === _category._id
                          ? 'bg-white'
                          : 'bg-cartNumBg'
                      } group-hover:bg-white flex items-center justify-center`}
                    >
                      <IoFastFood
                        className={`${
                          category._id === _category._id
                            ? 'text-textColor'
                            : 'text-white'
                        } group-hover:text-textColor text-lg`}
                      />
                    </div>
                    <p
                      className={`text-sm ${
                        category._id === _category._id
                          ? 'text-white'
                          : 'text-textColor'
                      } group-hover:text-white`}
                    >
                      {_category.name}
                    </p>
                  </motion.div>
                ))}
            </div>

            <div className="w-full">
              <div ref={rowContainer} className="w-full my-12 scroll-smooth ">
                {menuItems && menuItems.length > 0 ? (
                  <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto">
                    {menuItems.map((item) => (
                      <MenuItem
                        branch_id={branch_id}
                        id={item?.id}
                        thumbnail={item?.thumbnail}
                        name={item?.name}
                        category={item?.category_id?.name}
                        prices={item?.prices}
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

export default BranchPage
