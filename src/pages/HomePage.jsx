import React from 'react'
import {
  DmeterPricingCard,
  Header,
  HeroTestimonial,
  Searchbar,
} from '../components'
import HeroBg from '../img/heroBg.png'
import Logo from '../img/logo.png'
const testimonials = [
  {
    username: 'Sara Jones',
    restaurant_name: "sara's kitchen",
    review_title: 'Streamlined Operations',
    review:
      'DMeter has streamlined our restaurant operations, making it easier to manage multiple locations.',
    date: '2022-03-12',
  },
  {
    username: 'Mark Lee',
    restaurant_name: 'Happy Grillmore',
    review_title: 'Powerful and Reliable',
    review:
      'DMeter is a powerful and reliable restaurant management system that has helped us improve efficiency.',
    date: '2022-02-25',
  },
  {
    username: 'Emily Wong',
    restaurant_name: '21 & Cup',
    review_title: 'Great Value for Money',
    review:
      'DMeter is an affordable restaurant management solution that has helped us increase profits.',
    date: '2022-01-19',
  },
]
const pricingPlans = [
  {
    price: 4999,
    duration: 'monthly',
    subscriptionType: 'basic',
    benefits: ['up to 5 branches', 'online menu', 'order management'],
    discount: 0,
    discountPrice: null,
    trialPeriod: '14 days',
    paymentMethods: ['credit card', 'debit card', 'netbanking'],
    description: 'Ideal for small restaurant owners',
  },
  {
    price: 8999,
    duration: 'monthly',
    subscriptionType: 'standard',
    benefits: [
      'up to 10 branches',
      'inventory management',
      'customer insights',
    ],
    discount: 10,
    discountPrice: 8099,
    trialPeriod: '30 days',
    paymentMethods: ['credit card', 'debit card', 'netbanking'],
    description: 'Suitable for growing restaurant chains',
  },
  {
    price: 14999,
    duration: 'monthly',
    subscriptionType: 'premium',
    benefits: ['unlimited branches', 'POS integration', '24/7 support'],
    discount: 15,
    discountPrice: 12749,
    trialPeriod: '60 days',
    paymentMethods: ['credit card', 'debit card', 'netbanking', 'UPI'],
    description: 'Advanced solution for large restaurant groups',
  },
  {
    price: 29999,
    duration: 'year',
    subscriptionType: 'enterprise',
    benefits: ['customized solutions', 'dedicated account manager'],
    discount: 20,
    discountPrice: 23999,
    trialPeriod: '90 days',
    paymentMethods: ['invoice', 'PO'],
    description: 'Tailored to meet unique business needs',
  },
  {
    price: 0,
    duration: 'free',
    subscriptionType: 'trial',
    benefits: ['access to all features', 'limited time only'],
    discount: 0,
    discountPrice: null,
    trialPeriod: '7 days',
    paymentMethods: ['credit card', 'debit card', 'netbanking'],
    description: 'Try before you buy',
  },
]
export default function HomePage() {
  return (
    <div>
      <Header showSearch={false} />
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
        id="home"
      >
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-4">
          <h1 className="flex justify-center items-center gap-3 text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
            <img src={Logo} className="w-12 object-cover" alt="logo" /> Dmeter
          </h1>
          <p className=" lg:text-lg text-textColor">
            <span className="text-orange-600 font-bold">Dmeter</span> is the
            ultimate restaurant management solution. Manage multiple branches,
            orders, staff, online menus, POS, and more, all from a single
            platform. Streamline your operations and boost profits today.
          </p>
          <div className="w-full mt-4">
            <Searchbar />
          </div>
        </div>
        <div className="hidden py-2 flex-1 md:flex items-center relative">
          <img
            src={HeroBg}
            className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
            alt="hero-bg"
          />
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap">
            {testimonials.map((item) => (
              <HeroTestimonial
                username={item.username}
                restaurant_name={item.restaurant_name}
                review={item.review}
                review_title={item.review_title}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="w-full my-6" id="menu">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
            Pricing
          </p>

          <div className="w-full">
            <div className="w-full my-12 scroll-smooth ">
              <div className="container grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mx-auto">
                {pricingPlans.map((item) => (
                  <DmeterPricingCard
                    price={item.price}
                    duration={item.duration}
                    subscriptionType={item.subscriptionType}
                    benefits={item.benefits}
                    discount={item.discount}
                    discountPrice={item.discountPrice}
                    trialPeriod={item.trialPeriod}
                    paymentMethods={item.paymentMethods}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
