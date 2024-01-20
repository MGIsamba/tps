import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "KEY",
  authDomain: "authDomain",
  projectId: "ProjectID",
  storageBucket: "storageBucketId",
  messagingSenderId: "sendrId",
  appId: "appId"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export {app, firebase}