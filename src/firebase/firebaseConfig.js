// Firebase configuration - test database
const firebaseConfig = {
  apiKey: "AIzaSyAnlNryT9tKH9im9-1nSobapAewvi3V3s8",
  authDomain: "labseu1-db-test.firebaseapp.com",
  databaseURL: "https://labseu1-db-test.firebaseio.com",
  projectId: "labseu1-db-test",
  storageBucket: "labseu1-db-test.appspot.com",
  messagingSenderId: "280261803917",
  appId: "1:280261803917:web:3c02fd1e7ac4ae6a"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDN_U60Q7sT7pQb5fIgAxIiQONdKFlRbpM",
//   authDomain: "pinelynow.firebaseapp.com",
//   databaseURL: "https://pinelynow.firebaseio.com",
//   projectId: "pinelynow",
//   storageBucket: "pinelynow.appspot.com",
//   messagingSenderId: "889989507989",
//   appId: "1:889989507989:web:27482f759747227b"
// };

export default firebaseConfig;

export const paymentEndPoint =
  "https://us-central1-labseu1-db-test.cloudfunctions.net/app/charge";
