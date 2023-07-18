import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBV92oLBD6mer1zBdg1YTly59SouLf-2-4",
  authDomain: "promed-a9445.firebaseapp.com",
  projectId: "promed-a9445",
  storageBucket: "promed-a9445.appspot.com",
  messagingSenderId: "903887597109",
  appId: "1:903887597109:web:ee080d71864a51a69acb7c",
  measurementId: "G-3HKBSRB2NL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
