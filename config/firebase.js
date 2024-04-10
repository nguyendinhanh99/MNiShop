// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { collection, getFirestore, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvkwUZiLtbJm3L9f34nMsK-DsUYKU1MRI",
  authDomain: "nishop-de3c5.firebaseapp.com",
  projectId: "nishop-de3c5",
  storageBucket: "nishop-de3c5.appspot.com",
  messagingSenderId: "787097599981",
  appId: "1:787097599981:web:76e1ded400d386342db1e4"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Tạo một hàm để trả về tham chiếu đến collection "userInfo"
export const UserInfoRef = () => collection(db, "userInfo");
export const BuyDataRef = () => collection(db, "BuyData");
export const AllProductionRef = () => collection(db, "AllProduction");



export { app, db, auth, query, firebase };