// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBANAYfFIFgPsf23mt5M1MedMyRSqB2H24",
  authDomain: "omdb-react-f7a65.firebaseapp.com",
  projectId: "omdb-react-f7a65",
  storageBucket: "omdb-react-f7a65.firebasestorage.app",
  messagingSenderId: "188067573907",
  appId: "1:188067573907:web:6a48050dc5a81436541d66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
