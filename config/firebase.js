// Functions Import
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
// Add to .env file
const firebaseConfig = {
  apiKey: "AIzaSyAd6mwZsJC34i43YZbktyGHt_XlaeiapPE",
  authDomain: "debatts-7a954.firebaseapp.com",
  projectId: "debatts-7a954",
  storageBucket: "debatts-7a954.appspot.com",
  messagingSenderId: "774085724877",
  appId: "1:774085724877:web:aa72b4bb86b0362d6e7784",
  measurementId: "G-QM72DCKY99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
