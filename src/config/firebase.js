// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr0kp3kL6UFhOagwcpxIXyA22LoWG35h8",
  authDomain: "financetracker-8bcc4.firebaseapp.com",
  projectId: "financetracker-8bcc4",
  storageBucket: "financetracker-8bcc4.firebasestorage.app",
  messagingSenderId: "580154214846",
  appId: "1:580154214846:web:6ff1253f4dc7520af191ef",
  measurementId: "G-JZSM2V6JPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvide = new GoogleAuthProvider();
export const db = getFirestore(app);