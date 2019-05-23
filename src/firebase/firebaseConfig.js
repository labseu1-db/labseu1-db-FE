//Firebase configuration - test database
const firebaseConfig = {
  apiKey: 'AIzaSyAnlNryT9tKH9im9-1nSobapAewvi3V3s8',
  authDomain: 'labseu1-db-test.firebaseapp.com',
  databaseURL: 'https://labseu1-db-test.firebaseio.com',
  projectId: 'labseu1-db-test',
  storageBucket: 'labseu1-db-test.appspot.com',
  messagingSenderId: '280261803917'
};

export default firebaseConfig;

export const paymentEndPoint = 'https://us-central1-labseu1-db-test.cloudfunctions.net/app/charge';
