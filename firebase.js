// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjY_eXJRBfmUQOeK5N2zZ6UU6ISe02-sU",
  authDomain: "mad-sem-proj.firebaseapp.com",
  projectId: "mad-sem-proj",
  storageBucket: "mad-sem-proj.appspot.com",
  messagingSenderId: "1092216341759",
  appId: "1:1092216341759:web:c9b377d48b1bb95c4c78ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}