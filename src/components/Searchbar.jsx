import React from 'react'
import { FiSearch } from 'react-icons/fi'
export default function Searchbar() {
  return (
    <div className="w-full">
      <form>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-orange-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className=" text-orange-600" size={20} />
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 pl-10 text-headingColor border border-orange-300 rounded-lg bg-orange-50 focus:ring-orange-500 focus:border-orange-500 "
            placeholder="Search..."
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-orange-600 hover:bg-orange-700 transition-all ease-in-out focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}
