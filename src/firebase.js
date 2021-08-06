import firebase from "@firebase/app";
import "firebase/auth";
import "@firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyDYODNvJUuYu3ZHa6vnhpAAtYFm7JR2TwM",
  authDomain: "react-all-3d332.firebaseapp.com",
  databaseURL:
    "https://react-all-3d332-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-all-3d332",
  storageBucket: "react-all-3d332.appspot.com",
  messagingSenderId: "396160674778",
  appId: "1:396160674778:web:fc68029cd73dab42072ee3",
};

// คืนค่า firebase application ที่อาจถูก instantiate แล้วหรือ instantiate ใหม่
export default firebase.apps[0] || firebase.initializeApp(firebaseConfig);
