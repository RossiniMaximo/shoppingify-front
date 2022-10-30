import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiC2v02r2yQsQh71r7cmKDUh57-EgSc7Q",
  authDomain: "shoppingify-drawer.firebaseapp.com",
  projectId: "shoppingify-drawer",
  storageBucket: "shoppingify-drawer.appspot.com",
  messagingSenderId: "381194041136",
  appId: "1:381194041136:web:138b40aa3fea88f5653af5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
