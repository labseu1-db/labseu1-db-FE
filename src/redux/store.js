import { createStore, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from '../firebase/firebaseConfig.js';
import { initialState, rootReducer } from './reducer';

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const enhancers = [
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    userProfile: 'users',
    useFirestoreForProfile: true
  })
];

const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
