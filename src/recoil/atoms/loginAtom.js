import { atom } from 'recoil'

export const isOpenLoginPopUpAtom = atom({
  key: 'isOpenLoginPopUpAtom',
  default: false,
})

export const loginPopUpMsgAtom = atom({
  key: 'loginPopUpMsgAtom',
  default: '',
})
