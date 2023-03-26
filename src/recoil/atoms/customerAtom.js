import { atom } from 'recoil'

export const customerFirstnameAtom = atom({
  key: 'customerFirstname',
  default: '',
})

export const customerLastnameAtom = atom({
  key: 'customerLastname',
  default: '',
})

export const customerEmailAtom = atom({
  key: 'customerEmail',
  default: '',
})

export const customerPhoneAtom = atom({
  key: 'customerPhone',
  default: '',
})

export const customerIdAtom = atom({
  key: 'customerId',
  default: '',
})
