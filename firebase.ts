// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQxT7GLA2oHy7l8qQONgGLg4suPzuw4u4",
  authDomain: "padfinder-706dc.firebaseapp.com",
  databaseURL: "https://padfinder-706dc-default-rtdb.firebaseio.com",
  projectId: "padfinder-706dc",
  storageBucket: "padfinder-706dc.appspot.com",
  messagingSenderId: "910248660224",
  appId: "1:910248660224:web:860035b2cd77d7392a77e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, get };