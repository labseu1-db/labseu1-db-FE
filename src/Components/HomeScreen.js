import React, { useState, useEffect } from 'react';
import db from './db';

export default function HomeScreen() {
  const [threadArray, setThreadArray] = useState([]);

  //fetchUsers listens to real-time updates and gets the data from the database
  //data are the saved in users state using
  const fetchUsers = () => {
    db.collection('users2')
      .where('fullName', '==', 'Samar Vir')
      .onSnapshot(qs => {
        const spaces = [];
        qs.forEach(doc => {
          spaces.push(doc.data().spaces);
        });
        const thread = [];
        spaces[0].forEach(space => {
          db.collection('threads')
            .where('spaceID', '==', space.spaceID)
            .onSnapshot(qs => {
              qs.forEach(doc => {
                thread.push(doc.data());
              });
            });
          setThreadArray(thread);
        });
      });
  };
  console.log(threadArray);
  //useEffect (substitute for ComponentDidMount) renders new user when new user is added
  useEffect(() => {
    fetchUsers();
  }, []);

  /*- 
  [ ]  Thread name
- [ ]  Thread topic
- [ ]  Date thread created
- [ ]  Full name of user who created it
- [ ]  User profile picture
- [ ]  When was the last comment created 
*/
  return (
    <div>
      <h1>HomeScreen data</h1>

      <h2>Space names for the chosen organisation</h2>
      {threadArray[0] && <div> {threadArray[0].threadName}</div>}
    </div>
  );
}
