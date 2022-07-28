import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/database";

const provider = new firebase.auth.GoogleAuthProvider();

const CONFIG = {
  apiKey: "AIzaSyDDfGN5SKh0dDwGFE8fecV487mTPfp_DhA",
  authDomain: "tej-igg2.firebaseapp.com",
  databaseURL: "https://tej-igg2-default-rtdb.firebaseio.com",
  projectId: "tej-igg2",
  storageBucket: "tej-igg2.appspot.com",
  messagingSenderId: "534378301290",
  appId: "1:534378301290:web:8fc01bb96a22e033658713",
  measurementId: "G-YDDZVFH6S3",
  databaseURL: "https://tej-igg2-default-rtdb.firebaseio.com/",
};

const firebaseApp = firebase.initializeApp(CONFIG);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const rd = firebase.database().ref();
const storage = firebase.storage();

export { db, auth, provider, storage, rd, firebase };
