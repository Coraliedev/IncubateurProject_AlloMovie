import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './utils/firebaseConfig'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
