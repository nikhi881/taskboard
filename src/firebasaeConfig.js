// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from  "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCn2cfNYTrDBu1HK5MvAT5sv1_SPhRG3PU",
  authDomain: "taskboard-40a95.firebaseapp.com",
  projectId: "taskboard-40a95",
  storageBucket: "taskboard-40a95.appspot.com",
  messagingSenderId: "46705390417",
  appId: "1:46705390417:web:460813f8d7e2d602651970"
  };
  
// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyCn2cfNYTrDBu1HK5MvAT5sv1_SPhRG3PU",
//   authDomain: "taskboard-40a95.firebaseapp.com",
//   databaseURL: "https://taskboard-40a95-default-rtdb.firebaseio.com/",
//   projectId: "taskboard-40a95",
//   storageBucket: "taskboard-40a95.appspot.com",
//   messagingSenderId: "46705390417",
//   appId: "1:46705390417:web:460813f8d7e2d602651970",
//   measurementId: "G-8RS0E349CH"
// })


const firebaseApp = firebase.initializeApp(firebaseConfig);


export const auth = firebaseApp.auth()
export const firestore = firebaseApp.firestore()
export default firebaseApp
