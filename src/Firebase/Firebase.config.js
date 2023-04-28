// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4qLGS082J8po35fQjK2Hf9zoXSB0NwNE",
  authDomain: "ema-john-with-firebase-a-45f8a.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-45f8a",
  storageBucket: "ema-john-with-firebase-a-45f8a.appspot.com",
  messagingSenderId: "371669047690",
  appId: "1:371669047690:web:35d398e74a8effe8d59073"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;