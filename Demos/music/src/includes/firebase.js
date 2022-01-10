// importing the core module
import firebase from 'firebase/app';
// importing the auth module, because we'll be using it to authenticate the user
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDMitS7VjxmzNuMR0GZumKE_o3tuDA9WDM',
  authDomain: 'music-9ca17.firebaseapp.com',
  projectId: 'music-9ca17',
  storageBucket: 'music-9ca17.appspot.com',
  appId: '1:522963475139:web:4ad8ce6bd57af36e552076',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage,
};
