import { atom } from 'recoil'

export const showCartAtom = atom({
  key: 'showCartAtom',
  default: false,
})

export const cartItemCountAtom = atom({
  key: 'cartItemCountAtom',
  default: 0,
})
