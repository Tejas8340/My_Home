// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrjtW4eYeSY5OjN13UYc73Th2lSgy_bnY",
  authDomain: "myhome-c26d2.firebaseapp.com",
  projectId: "myhome-c26d2",
  storageBucket: "myhome-c26d2.appspot.com",
  messagingSenderId: "428553307895",
  appId: "1:428553307895:web:0fadcefd5193d8f3acb5f2",
  measurementId: "G-6VP8MPJBP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();