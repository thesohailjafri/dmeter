import React from 'react'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { Header, SignupCard } from '../components'
import { isOpenLoginPopUpAtom } from '../recoil/atoms/loginAtom'

export default function SignupPage() {
  const setIsOpenLoginPopUp = useSetRecoilState(isOpenLoginPopUpAtom)
  useEffect(() => setIsOpenLoginPopUp(false), [])
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
