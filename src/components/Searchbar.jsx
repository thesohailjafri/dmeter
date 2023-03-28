import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { searchKeywordAtom } from '../recoil/atoms/searchAtom'
export default function Searchbar() {
  const navigate = useNavigate()

  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordAtom)

  const search = () => {
    navigate(`/search?keyword=${searchKeyword}`)
  }

  const handleTermChange = (e) => {
    setSearchKeyword(e.target.value)
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }
  return (
    <div className="w-full">
      <div className="relative">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-orange-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="accent-orange-600 block w-full p-2 pl-10 text-headingColor border border-orange-300 rounded-lg bg-cardOverlay backdrop-blur-md focus:outline-none"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleTermChange}
            onKeyUp={handleKeyPress}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className=" text-orange-600" size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}
