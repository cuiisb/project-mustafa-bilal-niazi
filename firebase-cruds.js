import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjY_eXJRBfmUQOeK5N2zZ6UU6ISe02-sU",
  authDomain: "mad-sem-proj.firebaseapp.com",
  projectId: "mad-sem-proj",
  storageBucket: "mad-sem-proj.appspot.com",
  messagingSenderId: "1092216341759",
  appId: "1:1092216341759:web:c9b377d48b1bb95c4c78ca"
};
const app2 = initializeApp(firebaseConfig)
export const db= getFirestore(app2)