import React from 'react'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { Header, SigninCard } from '../components'
import { isOpenLoginPopUpAtom } from '../recoil/atoms/loginAtom'

export default function SigninPage() {
  const setIsOpenLoginPopUp = useSetRecoilState(isOpenLoginPopUpAtom)
  useEffect(() => setIsOpenLoginPopUp(false), [])
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
