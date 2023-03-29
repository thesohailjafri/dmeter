import { atom } from 'recoil'

export const showCartAtom = atom({
  key: 'showCartAtom',
  default: false,
})

export const cartAtom = atom({
  key: 'cartAtom',
  default: {},
})
