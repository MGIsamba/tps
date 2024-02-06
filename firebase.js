import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig = {
  apiKey: "AIzaSyCf9joY20oHxqhmSFUtAUYdd0eoRaD10_4",
  authDomain: "authDomain",
  projectId: "alpha-30ecc",
  storageBucket: "alpha-30ecc.appspot.com",
  messagingSenderId: "sendrId",
  appId: "appId"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, firebase, storage, auth, db }