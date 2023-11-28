
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJyWuZSpnwTI7d_x7in5qbpFyuT0Hm4qU",
  authDomain: "cloud-project-40ed3.firebaseapp.com",
  projectId: "cloud-project-40ed3",
  storageBucket: "cloud-project-40ed3.appspot.com",
  messagingSenderId: "247051508445",
  appId: "1:247051508445:web:e02df107262a3d811a9934",
  measurementId: "G-YZS6D7DBXL"
};

initializeApp(firebaseConfig);
const db = getFirestore();
export default db;
