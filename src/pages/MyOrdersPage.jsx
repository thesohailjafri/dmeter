import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCustomerOrdersApi } from '../api'
import { Header } from '../components'

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      const res = await getCustomerOrdersApi({
        fields: `order_note order_payment_source grand_total sub_total order_type createdAt
		order_status order_products order_delivery_charges branch_id restaurant_id`,
      })
      if (res) {
        if (res.status === 200) {
          setOrders(res.data.records)
        }
      }
    }
    getOrders()
  }, [])
  return (
    <div>
      <Header />
      <div className="mt-10">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </div>
      </div>
    </div>
  )

  function OrderCard({ order }) {
    const {
      order_type,
      order_payment_source,
      grand_total,
      sub_total,
      order_status,
      order_products,
      order_delivery_charges,
      createdAt,
      branch_id: branch,
      restaurant_id: restaurant,
    } = order
    return (
      <div className="p-4 bg-orange-50 rounded-lg flex flex-col drop-shadow-lg">
        <Link to={`/branch/${branch?.branch_slug}`}>
          <h6 className=" text-lg font-semibold mb-1">
            {restaurant.restaurant_name} (
            <span className="text-orange-600">{branch?.branch_name}</span>)
          </h6>
        </Link>
        <p>Type: {order_type}</p>
        <p>Status: {order_status}</p>
        <p>Payment: {order_payment_source}</p>
        <hr className="my-2" />
        <ul className="list-disc ml-5 flex flex-col gap-1">
          {order_products.map((prod) => {
            const { product_name, quantity, quantity_count, amount } = prod
            return (
              <li className="">
                <p className="flex justify-between mx-1">
                  <span>
                    {product_name}({quantity})
                  </span>
                  <span>
                    {quantity_count} x ₹{amount}
                  </span>
                </p>
              </li>
            )
          })}
        </ul>
        <div className="mt-auto">
          <hr className="my-2" />
          <p className="flex justify-between mx-1">
            <span>Subtotal</span>
            <span>₹{sub_total}</span>
          </p>
          <p className="flex justify-between mx-1">
            <span>Delivery</span>
            <span>₹{order_delivery_charges}</span>
          </p>
          <p className="flex text-lg font-semibold justify-between mx-1">
            <span>Total</span>
            <span>₹{grand_total}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between mx-1">
            {createdAt && (
              <span>Date: {new Date(createdAt).toLocaleDateString()}</span>
            )}

            <a href="" className="text-orange-600">
              Download Invoice
            </a>
          </p>
        </div>
      </div>
    )
  }
}
