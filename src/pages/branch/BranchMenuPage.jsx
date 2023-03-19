import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBranchUsingSlugApi, getMenu, getMenuCategories } from '../../api'
import { BranchHeader } from '../../components'
import { motion } from 'framer-motion'
import NotFound from '../../img/NotFound.svg'

export default function BranchMenuPage() {
  const params = useParams()
  const { branch_slug } = params
  const rowContainer = useRef()
  const [branch, setBranch] = useState({})
  const [categories, setCategories] = useState([])
  const [branch_id, setBranchId] = useState('')
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    if (!branch_slug) return
    const getData = async () => {
      const res = await getBranchUsingSlugApi(branch_slug)
      if (res) {
        if (res.status === 200) {
          setBranch(res.data.branch)
          setBranchId(res.data.branch._id)
        }
      }
    }
    getData()
  }, [branch_slug])

  // useEffect(() => {
  //   if (!branch_id) {
  //     return
  //   }
  //   const getData = async () => {
  //     const res = await getMenu({
  //       branch_id,
  //     })
  //     if (res) {
  //       if (res.status === 200) {
  //         setMenuItems(res.data.records)
  //       }
  //     }
  //   }
  //   getData()
  // }, [branch_id])

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
          let menu = await Promise.all(
            res.data.records.map(async (category) => {
              const cmRes = await getMenu({
                branch_id,
                category_id: category?._id,
              })
              if (res && res.status === 200) {
                return {
                  category,
                  categoryItems: cmRes.data.records,
                }
              }
            }),
          )
          setMenuItems(menu)
        }
      }
    }
    getData()
  }, [branch_id])

  return (
    <div>
      <BranchHeader
        homeUrl={`/branch/${branch_slug}`}
        menuUrl={`/menu/${branch_slug}`}
        aboutUsUrl={`/about/${branch_slug}`}
        orderUrl={`/orders/${branch_slug}`}
      />
      <div>
        <div className="w-full">
          <div ref={rowContainer} className="w-full my-12 scroll-smooth ">
            {menuItems && menuItems.length > 0 ? (
              <div className="">
                {menuItems.map((menuItem) => (
                  <div key={menuItem.category._id}>
                    <p className="my-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
                      {menuItem.category.name}
                    </p>
                    <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto">
                      {menuItem.categoryItems.map((categoryItem) => (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          key={categoryItem?.id}
                          className="p-4  bg-red-100 backdrop-blur-md rounded-3xl flex flex-col drop-shadow-lg"
                        >
                          <img
                            src={
                              'https://res.cloudinary.com/dhvfvo2yb/image/upload/v1664997220/' +
                              categoryItem?.thumbnail
                            }
                            alt=""
                            className="rounded-lg overflow-hiddens"
                          />

                          <div className="">
                            <h6 className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                              {categoryItem?.name}
                            </h6>
                            <p className="text-sm opacity-75">
                              {categoryItem?.category_id?.name}
                            </p>
                            <div className="mt-2 flex flex-col gap-2 justify-center">
                              {categoryItem?.prices &&
                                categoryItem?.prices.map((price, idx) => {
                                  return (
                                    <div className="flex justify-between">
                                      <span>{price?.quantity}</span>
                                      <span className="">₹{price?.amount}</span>
                                      <span>
                                        <button className="cursor-pointer bg-gradient-to-br from-orange-400 to-orange-500 font-semibold w-6 h-6 rounded m-0 text-white">
                                          +
                                        </button>
                                      </span>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <img alt="Not Found" src={NotFound} className="h-340" />
                <p className="text-xl text-headingColor font-semibold my-2">
                  Items Not Available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
