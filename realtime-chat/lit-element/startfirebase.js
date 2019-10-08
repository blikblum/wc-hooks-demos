import firebase from 'https://unpkg.com/@firebase/app@0.x?module'
import 'https://unpkg.com/@firebase/firestore?module'

// get configuration from external module
import firebaseConfig from '../firebase.config.js'

firebase.initializeApp(firebaseConfig)