// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAXTk1Erfv-pm8vu0_LB9WX2ORbbbxz6TM",
  authDomain: "instagram-clone-4cfe7.firebaseapp.com",
  projectId: "instagram-clone-4cfe7",
  storageBucket: "instagram-clone-4cfe7.firebasestorage.app",
  messagingSenderId: "949777711341",
  appId: "1:949777711341:web:f4f56aab4ad71396114ce4",
  measurementId: "G-RETTB93NTS"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, firestore, storage };