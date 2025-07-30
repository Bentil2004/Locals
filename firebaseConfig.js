// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJb2vPJwg4oOCS5lLezlzVhIG5RGcgzBI",
  authDomain: "locals-11d2a.firebaseapp.com",
  projectId: "locals-11d2a",
  storageBucket: "locals-11d2a.firebasestorage.app",
  messagingSenderId: "512768567879",
  appId: "1:512768567879:web:7adda87bc6a0454ef7df62",
  measurementId: "G-57BL8WMGNV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app); // Uncomment if you need Firebase Storage