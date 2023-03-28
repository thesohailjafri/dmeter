import React, { useEffect, useState } from 'react'
import { MdShoppingBasket, MdAdd, MdLogout, MdLogin } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { motion } from 'framer-motion'

import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import CartContainer from './CartContainer'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { showCartAtom } from '../recoil/atoms/cartAtom'
import {
  customerEmailAtom,
  customerFirstnameAtom,
  customerIdAtom,
  customerLastnameAtom,
  customerPhoneAtom,
} from '../recoil/atoms/customerAtom'

import { isOpenLoginPopUpAtom } from '../recoil/atoms/loginAtom'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-toastify'
import Searchbar from './Searchbar'

const Header = ({
  restaurantName,
  branchName,
  homeUrl,
  menuUrl,
  orderUrl,
  aboutUsUrl,
}) => {
  const location = useLocation()
  const navMenuItem = [
    {
      title: 'Branch',
      page: 'branch',
      url: homeUrl,
    },
    {
      title: 'Menu',
      page: 'menu',
      url: menuUrl,
    },
    {
      title: 'Orders',
      page: 'orders',
      url: orderUrl,
    },
    {
      title: 'About Us',
      page: 'about',
      url: aboutUsUrl,
    },
  ]
  const setCustomerFirstname = useSetRecoilState(customerFirstnameAtom)
  const setCustomerLastname = useSetRecoilState(customerLastnameAtom)
  const setCustomerEmail = useSetRecoilState(customerEmailAtom)
  const setCustomerPhone = useSetRecoilState(customerPhoneAtom)
  const setIsOpenLoginPopUp = useSetRecoilState(isOpenLoginPopUpAtom)

  const [customerID, setCustomerId] = useRecoilState(customerIdAtom)

  const setShowCart = useSetRecoilState(showCartAtom)
  const [page, setPage] = useState('')
  const [isMenu, setIsMenu] = useState(false)
  const cartItems = []
  const user = false
  const login = async () => {
    // if (!user) {
    //   const {
    //     user: { refreshToken, providerData },
    //   } = await signInWithPopup(firebaseAuth, provider)
    //   dispatch({
    //     type: actionType.SET_USER,
    //     user: providerData[0],
    //   })
    //   localStorage.setItem('user', JSON.stringify(providerData[0]))
    // } else {
    //   setIsMenu(!isMenu)
    // }
  }

  const handleLogout = () => {
    localStorage.removeItem('customer_token')
    setCustomerId('')
    setCustomerFirstname('')
    setCustomerLastname('')
    setCustomerEmail('')
    setCustomerPhone('')
    toast.success('Signed-out')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handleShowCart = () => {
    setShowCart(true)
  }

  const handleCloseCart = () => {
    setShowCart(false)
  }

  const handleUserIconClick = () => {
    setIsMenu(!isMenu)
  }

  useEffect(() => {
    if (!location) return
    const p = location.pathname.split('/')[1]
    setPage(p)
    handleCloseCart()
  }, [location])

  return (
    <>
      <header className="fixed top-0 left-0 z-10 w-screen p-3 px-4 md:p-6 md:px-16 bg-cardOverlay backdrop-blur-md border-b-4 border-orange-100">
        {/* desktop & tablet */}
        <div className="container mx-auto hidden md:flex items-center justify-between">
          <Link to={'/'} className="flex items-center gap-2">
            <img src={Logo} className="w-8 object-cover" alt="logo" />
            <p className="text-headingColor text-xl font-bold">
              {restaurantName || 'Restaurant'} (
              <span className="text-orange-600">{branchName || 'Branch'}</span>)
            </p>
          </Link>
          <div className="hidden xl:block">
            <Searchbar />
          </div>
          <div className="flex items-center gap-8">
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-8 lg:gap-16 xl:gap-24 "
            >
              {navMenuItem.map((i) => (
                <Link to={i.url}>
                  <li
                    className={classNames(
                      'text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer',
                      {
                        'underline underline-offset-8 decoration-orange-400 decoration-4 font-bold':
                          page === i.page,
                      },
                    )}
                  >
                    {i.title}
                  </li>
                </Link>
              ))}
              {!customerID && (
                <button
                  className="calltoaction-btn"
                  onClick={() => setIsOpenLoginPopUp(true)}
                >
                  <MdLogin />
                  Sign-In
                </button>
              )}
            </motion.ul>

            {customerID && (
              <>
                <div
                  className="relative flex items-center justify-center"
                  onClick={handleShowCart}
                >
                  <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
                  {cartItems && cartItems.length > 0 && (
                    <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                      <p className="text-xs text-white font-semibold">
                        {cartItems.length}
                      </p>
                    </div>
                  )}
                </div>
                <button className="calltoaction-btn" onClick={handleLogout}>
                  <MdLogout />
                  Sign-Out
                </button>
              </>
            )}
          </div>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-between md:hidden w-full h-full ">
          <div
            className="relative flex items-center justify-center"
            onClick={handleShowCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <Link to={'/'} className="flex items-center gap-2">
            <img src={Logo} className="w-8 object-cover" alt="logo" />
            <p className="text-headingColor text-xl font-bold"> City</p>
          </Link>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === 'project.dmeter@gmail.com' && (
                  <Link to={'/createItem'}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <ul className="flex flex-col ">
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setIsMenu(false)}
                  >
                    Home
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setIsMenu(false)}
                  >
                    Menu
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setIsMenu(false)}
                  >
                    About Us
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setIsMenu(false)}
                  >
                    Service
                  </li>
                </ul>

                <p
                  className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={handleLogout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </header>
      <CartContainer />
    </>
  )
}

export default Header
