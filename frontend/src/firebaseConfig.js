// firebaseInit.ts

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBAHAWBLyC6sKnffYHzk8e1MMC4AzpP0lA",
  authDomain: "study-buddy-51a85.firebaseapp.com",
  databaseURL: "https://study-buddy-51a85-default-rtdb.firebaseio.com",
  projectId: "study-buddy-51a85",
  storageBucket: "study-buddy-51a85.appspot.com",
  messagingSenderId: "316129025147",
  appId: "1:316129025147:web:21513102291945ac6496de",
  measurementId: "G-4D23BKMGXW",
};

const firebase = initializeApp(firebaseConfig);

export default firebase; 
