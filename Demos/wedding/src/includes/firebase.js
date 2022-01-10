import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAaMIkI5erL8fX5PgZfWUa1hwrElrrDOTM',
  authDomain: 'wedding-020622.firebaseapp.com',
  projectId: 'wedding-020622',
  storageBucket: 'wedding-020622.appspot.com',
  appId: '1:864951041610:web:bfd2cf24780d4fb54df0b3',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export {
  auth,
  db,
  usersCollection,
};
