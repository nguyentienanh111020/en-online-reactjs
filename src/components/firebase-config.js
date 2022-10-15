import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD_05is6V25xrVaN6Yki6JwBHNs2gaYGUo",
  authDomain: "enonline-9f93c.firebaseapp.com",
  projectId: "enonline-9f93c",
  storageBucket: "enonline-9f93c.appspot.com",
  messagingSenderId: "372349583642",
  appId: "1:372349583642:web:50e6ca8cc1ce973a18aca3",
  measurementId: "G-8RFZ2QZWP4",
  databaseURL:
    "https://enonline-9f93c-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const database = getDatabase(app);
