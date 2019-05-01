import { createStore, compose } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import { reduxFirestore } from "redux-firestore";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Import the firebase configuration - currently test database
import firebaseConfig from "../firebase/firebaseConfig.js";

//Import reducers
import { initialState, rootReducer } from "./reducer";

//Initialize database
firebase.initializeApp(firebaseConfig);
firebase.firestore();

//Connecting firestore to redux
const enhancers = [
  reduxFirestore(firebase),
  //This will be used for authenticaton - users are going to be stored in the firestore database
  reactReduxFirebase(firebase, {
    userProfile: "authedUsers",
    useFirestoreForProfile: true
  })
];

const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
