// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu-bwk-DBYZ5slUxl16xlXp84kAbxmggA",
  authDomain: "netflix-gpt-c1079.firebaseapp.com",
  projectId: "netflix-gpt-c1079",
  storageBucket: "netflix-gpt-c1079.appspot.com",
  messagingSenderId: "521028183619",
  appId: "1:521028183619:web:ab0779fce73b3cef1216f6",
  measurementId: "G-5H50SKQJG8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
