const firebase = require('firebase/app');
require('firebase/firestore');

//Firebase configuration
firebase.initializeApp({
	apiKey: 'AIzaSyBJ0HuZibBnUeo-AsJhJ_vXv_BIDh8s_NY',
	authDomain: 'labseu1-db-test2.firebaseapp.com',
	databaseURL: 'https://labseu1-db-test2.firebaseio.com',
	projectId: 'labseu1-db-test2',
	storageBucket: 'labseu1-db-test2.appspot.com',
	messagingSenderId: '1025548965547'
});
const db = firebase.firestore();

export default db;
