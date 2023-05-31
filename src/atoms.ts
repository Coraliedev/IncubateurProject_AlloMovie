import { atom } from 'jotai'

const isConnectedAtom = atom(false)
const userUidAtom = atom(null)
const modalVisibilityAtom = atom('')

export { isConnectedAtom, userUidAtom, modalVisibilityAtom }