// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABxNwh4sQCm9iim5sTG0wg3JWQ9Xwb11Y",
  authDomain: "todo-app-b7291.firebaseapp.com",
  projectId: "todo-app-b7291",
  storageBucket: "todo-app-b7291.appspot.com",
  messagingSenderId: "540764522881",
  appId: "1:540764522881:web:ed47d7e4fd4bdabd88c080"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)