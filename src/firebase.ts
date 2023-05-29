import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './utils/firebaseConfig'
import { getAuth } from 'firebase/auth'

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp
export const auth = getAuth(firebaseApp)
