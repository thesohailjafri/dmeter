import React from 'react'
import { Header } from '../components'
import Logo from '../img/logo.png'

export default function AboutusPage() {
  return (
    <div className="mt-10 lg:text-lg">
      <Header />
      <div className="grid gap-8">
        <div className="">
          <h2 className="text-3xl mb-8 flex justify-center items-center gap-3 font-extrabold text-headingColor sm:text-4xl md:text-5xl">
            <img className="w-12 object-cover" src={Logo} alt="DMeter Logo" />
            <span className="block">About Dmeter</span>
          </h2>
          <p className="text-center text-xl text-textColor">
            Welcome to <span className="text-orange-600">Dmeter</span>, the
            ultimate restaurant management solution that helps businesses
            streamline their operations and provide better customer experiences.
            Our platform is designed to manage all aspects of a restaurant,
            including orders, menus, staff, and inventory.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-cardOverlay backdrop-blur-md rounded-3xl px-6 py-8 drop-shadow-lg">
            <p className="mb-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              About Us:
            </p>
            <p>
              DMeter was founded in 2022 by a group of passionate foodies who
              understood the challenges faced by restaurant owners. Our goal was
              to create a platform that would simplify the management of
              restaurant operations and help businesses grow.
            </p>
          </div>
          <div className="bg-cardOverlay backdrop-blur-md rounded-3xl px-6 py-8 drop-shadow-lg">
            <p className="mb-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              History:
            </p>
            <p>
              Our journey began with a simple idea: to provide a comprehensive
              solution for restaurant management that could help owners save
              time and increase profits. Over the years, we have worked
              tirelessly to create a platform that offers advanced features and
              exceptional value to our customers. Today, we serve hundreds of
              businesses across the country and continue to innovate and improve
              our product.
            </p>
          </div>
          <div className="bg-cardOverlay backdrop-blur-md rounded-3xl px-6 py-8 drop-shadow-lg">
            <p className="mb-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              Team:
            </p>
            <p>
              Our team is comprised of industry experts, software engineers, and
              customer support professionals who are dedicated to helping our
              customers succeed. We believe in working closely with our clients
              to understand their needs and provide personalized support. Our
              team is passionate about technology, innovation, and providing the
              best possible service to our customers.{' '}
            </p>
          </div>
          <div className="bg-cardOverlay backdrop-blur-md rounded-3xl px-6 py-8 drop-shadow-lg">
            <p className="mb-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              Vision:
            </p>
            <p>
              Our vision is to be the go-to platform for restaurant owners who
              want to streamline their operations and provide exceptional
              customer experiences. We aim to continue innovating and adding new
              features that will help our customers grow their businesses and
              achieve their goals.{' '}
            </p>
          </div>
          <div className="bg-cardOverlay backdrop-blur-md rounded-3xl px-6 py-8 drop-shadow-lg">
            <p className="mb-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              Mission:
            </p>
            <p>
              Our mission is to empower restaurant owners with the tools they
              need to succeed. We believe that technology can transform the
              restaurant industry and we are committed to providing the best
              possible software solutions to our customers.{' '}
            </p>
          </div>
          <div className="bg-cardOverlay backdrop-blur-md rounded-3xl px-6 py-8 drop-shadow-lg">
            <p className="mb-8 text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
              Features:
            </p>
            <p>
              DMeter offers a wide range of features that are designed to help
              restaurants operate more efficiently and provide better customer
              experiences. Some of our key features include:
            </p>
            <ul className="list-disc ml-4 mt-4">
              <li>Online ordering and payment</li>
              <li>Menu management</li>
              <li>Staff scheduling and management</li>
              <li>Inventory tracking</li>
              <li>Table reservations</li>
              <li>Customer relationship management</li>
              <li>Analytics and reporting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
