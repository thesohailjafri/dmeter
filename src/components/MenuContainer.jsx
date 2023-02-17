import React, { useEffect, useState } from 'react'
import { IoFastFood } from 'react-icons/io5'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { getMenu } from '../api'

const MenuContainer = ({ categories }) => {
  const [category, setCategory] = useState({})
  const [menuItems, setMenuItems] = useState([])

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

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Menu
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((_category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={_category._id}
                className={`group ${
                  category._id === _category._id ? 'bg-cartNumBg' : 'bg-card'
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => setCategory(_category)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    category._id === _category._id ? 'bg-white' : 'bg-cartNumBg'
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
          <RowContainer flag={false} data={menuItems} />
        </div>
      </div>
    </section>
  )
}

export default MenuContainer
