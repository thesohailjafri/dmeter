import React from 'react'
import { Header, SigninCard } from '../components'

export default function SigninPage() {
  return (
    <div className="">
      <Header />
      <div className="w-full h-full flex justify-center items-center mt-10">
        <div className="w-460 border-orange-100 border-4 p-6 rounded-xl">
          <SigninCard />
        </div>
      </div>
    </div>
  )
}
