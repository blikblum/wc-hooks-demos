import firebase from 'https://unpkg.com/@firebase/app@0.x?module'
import 'https://unpkg.com/@firebase/firestore?module'
import './chat-app.js'
// get configuration from external module
import firebaseConfig from './firebase.config.js'

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const DbProviderEl = document.querySelector('db-provider')
DbProviderEl.value = db

