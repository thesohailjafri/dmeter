import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginCard() {
  return (
    <div class="max-w-2xl mx-auto">
      <div class="bg-white  rounded-lg max-w-sm">
        <form class="space-y-6" action="#">
          <h3 class="text-xl font-medium text-gray-900 ">
            Sign in to our platform
          </h3>

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
          <div class="flex items-start">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  class="bg-orange-50 border accent-orange-600 border-gray-300 focus:ring-3 focus:ring-orange-300 h-4 w-4 rounded "
                  required=""
                />
              </div>
              <div class="text-sm ml-3">
                <label for="remember" class="font-medium text-gray-900 ">
                  Remember me
                </label>
              </div>
            </div>
            <Link
              to="/resetpass"
              class="text-sm text-orange-600 hover:underline ml-auto "
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            class="w-full text-white bg-gradient-to-br from-orange-400 to-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Login to your account
          </button>
          <div class="text-sm font-medium text-gray-500 ">
            Not registered?{' '}
            <Link to="/signup" class="text-orange-600 hover:underline ">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
