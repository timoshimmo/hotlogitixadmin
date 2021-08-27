import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9oBGU8-qyE1pDwtN6sPnTmzhkvHCWGo8",
  authDomain: "hotlogistix-d9df1.firebaseapp.com",
  databaseURL: "https://hotlogistix-d9df1-default-rtdb.firebaseio.com",
  projectId: "hotlogistix-d9df1",
  storageBucket: "hotlogistix-d9df1.appspot.com",
  messagingSenderId: "440485520317",
  appId: "1:440485520317:web:acfaf8ad110a0fa369e8d4",
  measurementId: "G-1LL12HCXLN"
};

firebase.initializeApp(firebaseConfig);

const instance = firebase.firestore();

export default instance;
