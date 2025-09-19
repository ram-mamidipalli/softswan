// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjlJRF2Bze_NHkegYtjJMX--O6ToQ4hWE",
  authDomain: "softswan-af124.firebaseapp.com",
  projectId: "softswan-af124",
  storageBucket: "softswan-af124.appspot.com",
  messagingSenderId: "1035750412655",
  appId: "1:1035750412655:web:69d74d67f9a1309adb989a",
  measurementId: "G-F6HDRSMDYM"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
