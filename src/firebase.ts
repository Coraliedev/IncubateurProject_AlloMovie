import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './utils/firebaseConfig'

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp