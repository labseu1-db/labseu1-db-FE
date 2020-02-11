//Firebase configuration - test database
const firebaseConfigProduction = {
  apiKey: "AIzaSyAnlNryT9tKH9im9-1nSobapAewvi3V3s8",
  authDomain: "labseu1-db-test.firebaseapp.com",
  databaseURL: "https://labseu1-db-test.firebaseio.com",
  projectId: "labseu1-db-test",
  storageBucket: "labseu1-db-test.appspot.com",
  messagingSenderId: "280261803917",
  appId: "1:280261803917:web:3c02fd1e7ac4ae6a"
};
var firebaseConfigStaging = {
  apiKey: "AIzaSyCCwoDp2h3hUwqn5nGDD3BIRCeGT1A8yWo",
  authDomain: "pinely-staging.firebaseapp.com",
  databaseURL: "https://pinely-staging.firebaseio.com",
  projectId: "pinely-staging",
  storageBucket: "pinely-staging.appspot.com",
  messagingSenderId: "10729362050",
  appId: "1:10729362050:web:59266b15015d5b96f71a9b",
  measurementId: "G-HY76MYB9Q1"
};
let firebaseConfig;
if (process.env.TRAVIS_BUILD_STAGE_NAME === "production") {
  firebaseConfig = firebaseConfigProduction;
} else {
  firebaseConfig = firebaseConfigStaging;
}

export default firebaseConfig;

export const paymentEndPoint =
  "https://us-central1-labseu1-db-test.cloudfunctions.net/app/charge";
