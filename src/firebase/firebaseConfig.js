import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCQgy8LGYLD9_iROZtkR4MDzGJglKZ0_Zw",
  authDomain: "login-redux-21b77.firebaseapp.com",
  projectId: "login-redux-21b77",
  storageBucket: "login-redux-21b77.appspot.com",
  messagingSenderId: "656590112328",
  appId: "1:656590112328:web:0553c06affeb842c42fa7d"
};

const app = initializeApp(firebaseConfig);
const googleAuth = new GoogleAuthProvider();

export {app, googleAuth}