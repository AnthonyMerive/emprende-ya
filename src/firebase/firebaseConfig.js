import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBDzP2BTRNdLqusZm7AqaEvYuYzX6kx_Kw",
  authDomain: "emprende-ya-7f495.firebaseapp.com",
  projectId: "emprende-ya-7f495",
  storageBucket: "emprende-ya-7f495.appspot.com",
  messagingSenderId: "622274255185",
  appId: "1:622274255185:web:bbabe55064b8a6c0885b70"
};

const app = initializeApp(firebaseConfig);
const googleAuth = new GoogleAuthProvider();
const db = getFirestore(app)

export {app, googleAuth,db}