import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage}from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyB7BVq1m0GjE2KZMJGDa7kiJT_J04Tf_CM",
  authDomain: "foodapp-1e17e.firebaseapp.com",
  databaseURL: "https://foodapp-1e17e-default-rtdb.firebaseio.com",
  projectId: "foodapp-1e17e",
  storageBucket: "foodapp-1e17e.appspot.com",
  messagingSenderId: "1049061514642",
  appId: "1:1049061514642:web:543f50eecefbe753ff754b"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export {app, db, storage}