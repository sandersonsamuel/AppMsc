import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBl61yOSAYbzEK4_EoS3B52tAlqsbvATSw",
  authDomain: "appmusic-f51c4.firebaseapp.com",
  projectId: "appmusic-f51c4",
  storageBucket: "appmusic-f51c4.appspot.com",
  messagingSenderId: "915745691537",
  appId: "1:915745691537:web:5bfab7fb2d447b372e2c30"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)