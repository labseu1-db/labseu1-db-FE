const firebase = require('firebase/app');
require('firebase/firestore');

//Firebase configuration
firebase.initializeApp({
  apiKey: 'AIzaSyD59KY_n3nhHH1g1VhoBFs_xlYnnM0BgEU',
  authDomain: 'labseu1-db.firebaseapp.com',
  databaseURL: 'https://labseu1-db.firebaseio.com',
  projectId: 'labseu1-db',
  storageBucket: 'labseu1-db.appspot.com',
  messagingSenderId: '952063624780'
});
const db = firebase.firestore();

export default db;
