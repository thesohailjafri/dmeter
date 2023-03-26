import React from 'react'
import { Header, SignupCard } from '../components'

export default function SignupPage() {
  return (
    <div>
      <Header />
      <div className="w-full h-full flex justify-center items-center mt-10">
        <div className="w-460 border-orange-100 border-4 p-6 rounded-xl">
          <SignupCard />
        </div>
      </div>
    </div>
  )
}
