import React from 'react'
import { MdCheck } from 'react-icons/md'
export default function DmeterPricingCard({
  price,
  duration,
  description,
  subscriptionType,
  benefits,
  discount,
  discountPrice,
  trialPeriod,
  paymentMethods,
}) {
  return (
    <div>
      {/* <!-- Pricing Card --> */}
      <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-textColor bg-cardOverlay backdrop-blur-md rounded-3xl drop-shadow-lg border border-gray-100 shadow">
        <h3 className="mb-4 text-2xl font-semibold">{subscriptionType}</h3>
        <p className="font-light text-orange-600 sm:text-lg ">{description}</p>
        <div className="flex justify-center items-baseline my-8">
          <span className="mr-1 text-3xl lg:text-4xl font-extrabold">
            ₹{price}
          </span>
          <span className=" ">/{duration}</span>
        </div>
        {/* <!-- List --> */}
        <ul role="list" className="mb-8 space-y-4 text-left">
          {benefits.map((benefit) => (
            <li class="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <MdCheck size={20} />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <a href="#" className="text-orange-600">
          Get started
        </a>
      </div>
    </div>
  )
}
