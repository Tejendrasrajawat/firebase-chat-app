import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";

const provider = new firebase.auth.GoogleAuthProvider();

const CONFIG = {
  apiKey: "AIzaSyCz9tivjZv3hwOPbobXp3sZ7l8JBn7ruvw",
  authDomain: "fir-demo-e5ab9.firebaseapp.com",
  projectId: "fir-demo-e5ab9",
  storageBucket: "fir-demo-e5ab9.appspot.com",
  messagingSenderId: "127260826688",
  appId: "1:127260826688:web:d1148e2180023dc42613a5",
};

const firebaseApp = firebase.initializeApp(CONFIG);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage };
