// import React, { useState, useEffect } from 'react';
// import db from './db';

// export default function DisplayData() {
//   const [users, setUsers] = useState([]);

//   //fetchUsers listens to real-time updates and gets the data from the database
//   //data are the saved in users state using
//   const fetchUsers = () => {
//     db.collection('users2').onSnapshot(querySnapshot => {
//       const users = [];
//       querySnapshot.forEach(doc => {
//         users.push(doc.data());
//       });
//       setUsers(users);
//     });
//   };

//   //useEffect (substitute for ComponentDidMount) renders new user when new user is added
//   useEffect(() => {
//     fetchUsers();
//   }, [users]);

//   return (
//     <div>
//       <h2>Users in database:</h2>
//       {users.map((user, index) => {
//         return <div key={index}>{user.fullName}</div>;
//       })}
//     </div>
//   );
// }
