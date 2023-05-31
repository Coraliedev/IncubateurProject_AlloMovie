import { atom } from 'jotai'

const isConnectedAtom = atom(false)
const authVisibilityAtom = atom('')

export { isConnectedAtom, authVisibilityAtom }