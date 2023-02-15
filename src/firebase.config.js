import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDGupwQ17ri-yawBwisB07c3VIqNARiixY',
  authDomain: 'dmeter-prg.firebaseapp.com',
  databaseURL: 'https://dmeter-prg-default-rtdb.firebaseio.com',
  projectId: 'dmeter-prg',
  storageBucket: 'dmeter-prg.appspot.com',
  messagingSenderId: '88337418274',
  appId: '1:88337418274:web:7f3251561d053dddd0627b',
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage }
