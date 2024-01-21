import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from 'firebase/storage'; //access the storage database


export const firebaseConfig = {
  apiKey: "AIzaSyCQqcGF3In-Ky7YShGwc8btHgjm_5YYZbE",
  authDomain: "authDomain",
  projectId: "acoy-1fede",
  storageBucket: "acoy-1fede.appspot.com",
  messagingSenderId: "sendrId",
  appId: "appId"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export {app, firebase}