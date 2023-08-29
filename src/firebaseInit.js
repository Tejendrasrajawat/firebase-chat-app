import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/database";

const provider = new firebase.auth.GoogleAuthProvider();

const CONFIG = {
  apiKey: "AIzaSyC4UiBbzRPIoyurRDjODUDx8OnQK25NurU",
  authDomain: "chatroom-645a8.firebaseapp.com",
  databaseURL: "https://chatroom-645a8.firebaseio.com",
  projectId: "chatroom-645a8",
  storageBucket: "chatroom-645a8.appspot.com",
  messagingSenderId: "455556552737",
  appId: "1:455556552737:web:8dba48fadd1e3607b92b60"
};

const firebaseApp = firebase.initializeApp(CONFIG);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const rd = firebase.database().ref();
const storage = firebase.storage();

export { db, auth, provider, storage, rd, firebase };
