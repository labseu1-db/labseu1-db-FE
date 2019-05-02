import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export const initialState = {};

//When we have local reducers, we nbeed to add them here
export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
