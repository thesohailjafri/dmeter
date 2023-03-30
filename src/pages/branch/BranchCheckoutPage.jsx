import React from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { getBranchUsingSlugApi, updateCustomerCartApi } from '../../api'
import { BranchHeader, CartItem } from '../../components'
import { cartAtom, showCartAtom } from '../../recoil/atoms/cartAtom'
import {
  customerFirstnameAtom,
  customerIdAtom,
  customerLastnameAtom,
  customerPhoneAtom,
} from '../../recoil/atoms/customerAtom'
import { isOpenLoginPopUpAtom } from '../../recoil/atoms/loginAtom'

import { RiRefreshFill } from 'react-icons/ri'

import { motion } from 'framer-motion'

import EmptyCart from '../../img/emptyCart.svg'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { isMobilePhone } from 'validator'
import { Link } from 'react-router-dom'
import { postCustomerOrderApi } from '../../api/customerApi'

const orderTypes = ['Dine', 'Takeaway', 'Delivery', 'Pre-Order']
const orderPaymentTypes = ['Cash', 'Online Transaction']
export default function BranchCheckoutPage() {
  const params = useParams()
  const { branch_slug } = params
  const [branch_id, setBranchId] = useState('')
  const [branch, setBranch] = useState({})
  const [branchAddress, setBranchAddress] = useState({})
  const setCartAtom = useSetRecoilState(cartAtom)

  const cfname = useRecoilValue(customerFirstnameAtom)
  const clname = useRecoilValue(customerLastnameAtom)
  const customer_phone = useRecoilValue(customerPhoneAtom)

  const customer_name = `${cfname} ${clname}`

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

  const customerId = useRecoilValue(customerIdAtom)
  const [cart, setCart] = useRecoilState(cartAtom)
  const [sub_total, setSubtotal] = useState(0)
  const [grand_total, setGrandtotal] = useState(0)

  const setIsOpenLoginPopUp = useSetRecoilState(isOpenLoginPopUpAtom)

  const calculateTotal = useCallback(() => {
    if (!cart.products) {
      return
    }
    let _subtotal = 0
    cart.products.forEach((p) => (_subtotal += p.amount * p.quantity_count))
    setSubtotal(_subtotal)
    setGrandtotal(_subtotal)
  }, [cart])
  useEffect(() => calculateTotal(), [calculateTotal])

  return (
    <div>
      <BranchHeader
        restaurantName={branch?.restaurant_id?.restaurant_name}
        branchName={branch?.branch_name}
        branch_slug={branch_slug}
        branch_id={branch_id}
      />
      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          className=" "
        >
          {/* bottom section */}
          {!customerId ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <img src={EmptyCart} className="w-300" alt="" />
              <button
                className="calltoaction-btn"
                onClick={() => setIsOpenLoginPopUp(true)}
              >
                Sign-in to access checkout page
              </button>
            </div>
          ) : cart?.products && cart?.products.length > 0 ? (
            <div className="flex flex-col-reverse lg:grid grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-orange-50 rounded-3xl p-4 lg:p-6">
                {/* cart Item */}
                <h2 className=" text-xl font-bold text-center">
                  Shipping & Billing Information
                </h2>
                <hr className="my-4" />

                <Formik
                  initialValues={{
                    order_address: '',
                    order_city: '',
                    order_state: '',
                    order_country: '',
                    order_note: '',
                    order_type: '',
                    order_payment_source: '',
                  }}
                  validate={(values) => {
                    const errors = {}
                    const { order_type, order_payment_source } = values
                    if (!order_type) {
                      errors.order_type = 'Order type is required'
                    }
                    if (!order_payment_source) {
                      errors.order_payment_source = 'Payment source is required'
                    }
                    if (order_type === 'Delivery') {
                      const {
                        order_address,
                        order_city,
                        order_state,
                        order_country,
                      } = values
                      if (!order_address) {
                        errors.order_address = 'Address is required'
                      }
                      if (!order_city) {
                        errors.order_city = 'City is required'
                      }
                      if (!order_state) {
                        errors.order_state = 'State is required'
                      }
                      if (!order_country) {
                        errors.order_country = 'Country is required'
                      }
                    }
                    return errors
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    const res = await postCustomerOrderApi({
                      ...values,
                      branch_id,
                      customer_name,
                      customer_phone,
                      order_products: cart.products,
                      sub_total,
                      grand_total,
                    })
                    if (res) {
                      const cres = await updateCustomerCartApi('clearItems', {
                        branch_id,
                      })
                      if (cres) {
                        if (res.status === 201) {
                          setCart(res.data)
                        }
                      }
                      resetForm()
                      setSubmitting(false)
                    }
                  }}
                >
                  {({ values, isSubmitting }) => (
                    <Form className="flex flex-col">
                      <div className="grid gap-4 grid-cols-12 pt-4">
                        <div className="col-span-12 lg:col-span-6">
                          <label
                            for="customer_name"
                            className="font-medium text-gray-900 block "
                          >
                            Name on order
                          </label>
                          <Field
                            value={customer_name}
                            id="customer_name"
                            placeholder="Enter name"
                            type="text"
                            className="form-field bg-white text-base"
                            disabled
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <label
                            for="customer_phone"
                            className="font-medium text-gray-900 block  "
                          >
                            Phone number
                          </label>
                          <Field
                            value={customer_phone}
                            id="customer_phone"
                            placeholder="Enter phone number"
                            type="tel"
                            className="form-field bg-white text-base"
                            disabled
                          />
                        </div>
                        <div
                          className="col-span-12 flex flex-wrap items-center gap-4"
                          role="group"
                          aria-labelledby="order_type_group"
                        >
                          <label className="font-medium text-gray-900 block  ">
                            Order Type:
                          </label>
                          {orderTypes.map((type) => (
                            <label className="text font-medium text-gray-900 block ">
                              <Field
                                type="radio"
                                name="order_type"
                                value={type}
                                className="mr-1 accent-orange-600 "
                              />
                              {type}
                            </label>
                          ))}
                          <ErrorMessage
                            className="form-field-err"
                            name="order_type"
                            component="small"
                          />
                        </div>
                        {values.order_type === 'Delivery' && (
                          <>
                            <div className="col-span-12">
                              <label
                                for="order_address"
                                className="font-medium text-gray-900 block  "
                              >
                                Address
                              </label>
                              <Field
                                name="order_address"
                                id="order_address"
                                placeholder="Enter address"
                                type="text"
                                className="form-field bg-white text-base"
                                component="textarea"
                              />
                              <ErrorMessage
                                className="form-field-err"
                                name="order_address"
                                component="small"
                              />
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <label
                                for="order_city"
                                className="font-medium text-gray-900 block  "
                              >
                                City
                              </label>
                              <Field
                                name="order_city"
                                id="order_city"
                                placeholder="Enter city"
                                type="text"
                                className="form-field bg-white text-base"
                              />
                              <ErrorMessage
                                className="form-field-err"
                                name="order_city"
                                component="small"
                              />
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <label
                                for="order_state"
                                className="font-medium text-gray-900 block  "
                              >
                                State
                              </label>
                              <Field
                                name="order_state"
                                id="order_state"
                                placeholder="Enter state"
                                type="text"
                                className="form-field bg-white text-base"
                              />
                              <ErrorMessage
                                className="form-field-err"
                                name="order_state"
                                component="small"
                              />
                            </div>
                            <div className="col-span-12 lg:col-span-4">
                              <label
                                for="order_country"
                                className="font-medium text-gray-900 block  "
                              >
                                Country
                              </label>
                              <Field
                                name="order_country"
                                id="order_country"
                                placeholder="Enter country"
                                type="text"
                                className="form-field bg-white text-base"
                              />
                              <ErrorMessage
                                className="form-field-err"
                                name="order_country"
                                component="small"
                              />
                            </div>
                          </>
                        )}
                        <div
                          className="col-span-12 flex flex-wrap items-center gap-4"
                          role="group"
                          aria-labelledby="order_payment_source_group"
                        >
                          <label className="font-medium text-gray-900 block">
                            Payment:
                          </label>
                          {orderPaymentTypes.map((type) => (
                            <label className="text font-medium text-gray-900 block">
                              <Field
                                type="radio"
                                name="order_payment_source"
                                value={type}
                                className="mr-1 accent-orange-600 "
                              />
                              {type}
                            </label>
                          ))}
                          <ErrorMessage
                            className="form-field-err"
                            name="order_payment_source"
                            component="small"
                          />
                        </div>
                        <div className="col-span-12 mb-4">
                          <label
                            for="order_note"
                            className="font-medium text-gray-900 block  "
                          >
                            Note
                          </label>
                          <Field
                            name="order_note"
                            id="order_note"
                            placeholder="Enter a note for restaurant branch if any"
                            type="text"
                            className="form-field bg-white text-base"
                            component="textarea"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-auto text-white bg-gradient-to-br from-orange-400
			to-orange-500 focus:ring-4 focus:ring-orange-300 font-medium
			rounded-lg px-5 py-2.5 text-center "
                      >
                        Place Order
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="">
                {/* cart Items section */}

                <div className="bg-orange-50 rounded-3xl p-4 lg:p-6 flex flex-col gap-4">
                  {/* cart Item */}
                  <h2 className=" text-xl font-bold text-center">
                    Order Summary
                  </h2>
                  <hr className="mb-4" />

                  <div className="w-full flex flex-col gap-4 overflow-y-scroll scrollbar-none ">
                    {cart?.products &&
                      cart?.products.length > 0 &&
                      cart?.products.map((product) => (
                        <CartItem
                          product={product}
                          branch_id={branch_id}
                          checkoutElement={true}
                        />
                      ))}
                  </div>
                  <hr className="my-4" />

                  <div className="w-full p-4 rounded-lg flex flex-col gap-4 bg-white">
                    <div className="w-full flex items-center justify-between ">
                      <p className="text-xl">Sub Total</p>
                      <p className="text-xl font-semibold">₹{sub_total}</p>
                    </div>
                    <div className="w-full flex items-center justify-between ">
                      <p className="text-xl">Delivery</p>
                      <p className="text-xl font-semibold">₹{25}</p>
                    </div>
                  </div>
                  <div className="w-full p-4 rounded-lg  flex items-center justify-between gap-2 bg-white">
                    <p className="text-xl font-semibold">Total</p>
                    <p className="text-xl font-bold">₹{sub_total + 25}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <img src={EmptyCart} className="w-300" alt="" />
              <p className="text-xl text-textColor font-semibold">
                Add some items to your cart
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
