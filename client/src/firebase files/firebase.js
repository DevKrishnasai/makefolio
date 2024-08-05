// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_FIREBASE_API_KEY,
  authDomain: "portfolio-maker-faf5d.firebaseapp.com",
  projectId: "portfolio-maker-faf5d",
  storageBucket: "portfolio-maker-faf5d.appspot.com",
  messagingSenderId: "868839020402",
  appId: "1:868839020402:web:40431a6e89cc466fdcefeb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
