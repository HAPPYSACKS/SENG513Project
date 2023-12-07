// firebaseInit.ts

import * as admin from "firebase-admin";
require("dotenv").config();

const firebaseConfig = {
  databaseURL: "https://study-buddy-51a85-default-rtdb.firebaseio.com",
  storageBucket: "study-buddy-51a85.appspot.com",
  projectId: "study-buddy-51a85",
};

const serviceAccount = "key.json";

// const firebaseConfig = {
//   apiKey: "AIzaSyBAHAWBLyC6sKnffYHzk8e1MMC4AzpP0lA",
//   authDomain: "study-buddy-51a85.firebaseapp.com",
//   databaseURL: "https://study-buddy-51a85-default-rtdb.firebaseio.com",
//   projectId: "study-buddy-51a85",
//   storageBucket: "study-buddy-51a85.appspot.com",
//   messagingSenderId: "316129025147",
//   appId: "1:316129025147:web:21513102291945ac6496de",
//   measurementId: "G-4D23BKMGXW",
// };

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConfig.databaseURL,
  });
}

export default admin; // Ensure this line is present
