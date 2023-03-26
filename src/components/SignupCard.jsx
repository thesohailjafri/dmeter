import React from 'react'
import { Link } from 'react-router-dom'

export default function SignupCard() {
  return (
    <div class="max-w-2xl mx-auto">
      <div class="bg-white  rounded-lg">
        <form class="space-y-6" action="#">
          <h3 class="text-xl font-medium text-gray-900 ">
            Sign up to our platform
          </h3>
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6">
            <div>
              <label
                for="firstname"
                class="text-sm font-medium text-gray-900 block mb-2 "
              >
                Your Firstname
              </label>
              <input
                type="tel"
                name="firstname"
                id="firstname"
                pattern="[0-9]{10}"
                class="bg-orange-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                placeholder="John"
                required=""
              />
            </div>
            <div>
              <label
                for="lastname"
                class="text-sm font-medium text-gray-900 block mb-2 "
              >
                Your Lastname
              </label>
              <input
                type="tel"
                name="lastname"
                id="lastname"
                pattern="[0-9]{10}"
                class="bg-orange-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                placeholder="Doe"
                required=""
              />
            </div>
          </div>
          <div>
            <label
              for="phone"
              class="text-sm font-medium text-gray-900 block mb-2 "
            >
              Your phone number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              pattern="[0-9]{10}"
              class="bg-orange-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="9876543210"
              required=""
            />
          </div>
          <div>
            <label
              for="password"
              class="text-sm font-medium text-gray-900 block mb-2 "
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-orange-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              required=""
            />
          </div>

          <button
            type="submit"
            class="w-full text-white bg-gradient-to-br from-orange-400 to-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Register your account
          </button>
          <div class="text-sm font-medium text-gray-500 ">
            Already have accout?{' '}
            <Link to="/signin" class="text-orange-600 hover:underline ">
              Sign-in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
