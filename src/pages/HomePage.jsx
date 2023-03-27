import React from 'react'
import { Header, HeroTestimonial, Searchbar } from '../components'
import HeroBg from '../img/heroBg.png'
import Logo from '../img/logo.png'
const testimonials = [
  {
    username: '',
    review: '',
  },

  {
    username: '',
    review: '',
  },

  {
    username: '',
    review: '',
  },

  {
    username: '',
    review: '',
  },
]
export default function HomePage() {
  return (
    <div>
      <Header />
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
        id="home"
      >
        <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
          <h1 className="flex justify-center items-center gap-3 text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide -mb-6 text-headingColor">
            <img src={Logo} className="w-12 object-cover" alt="logo" /> Dmeter
          </h1>
          <p className="text-md lg:text-xl">
            Welcome to <span className="text-orange-600 font-bold">Dmeter</span>
            , the ultimate restaurant management solution.
            <br /> Our powerful SaaS application can{' '}
            <span className=" underline underline-offset-4 decoration-dotted  decoration-orange-600 ">
              handle multiple branches, orders, staff, online menus, POS, and
              more.
            </span>{' '}
            Whether you're a small restaurant or a large chain, DMeter has
            everything you need to streamline your operations and take your
            business to the next level.
          </p>
          <Searchbar />

          <p className="text-base text-textColor text-center md:text-left md:w-[80%]"></p>
        </div>
        <div className="hidden py-2 flex-1 md:flex items-center relative">
          <img
            src={HeroBg}
            className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
            alt="hero-bg"
          />
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 gap-4 flex-wrap">
            {testimonials.map((item) => (
              <HeroTestimonial username={item.username} review={item.review} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
