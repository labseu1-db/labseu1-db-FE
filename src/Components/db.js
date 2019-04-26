const firebase = require('firebase/app');
require('firebase/firestore');

//Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyAnlNryT9tKH9im9-1nSobapAewvi3V3s8",
  authDomain: "labseu1-db-test.firebaseapp.com",
  databaseURL: "https://labseu1-db-test.firebaseio.com",
  projectId: "labseu1-db-test",
  storageBucket: "labseu1-db-test.appspot.com",
  messagingSenderId: "280261803917"
});
const db = firebase.firestore();

export default db;
