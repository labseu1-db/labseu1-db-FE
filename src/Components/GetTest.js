import React, { useState, useEffect } from 'react';
import db from './db';

export default function GetTest() {
  const [usersCollection, setUserCollection] = useState([]);

  const getUsers = () => {
    db.collection('users').get()
      .then(collection => {
        // console.log("users collection:", collection)
        collection.forEach(doc => {
          // console.log(doc.id, "has data", doc.data().firstName)
          const newName = doc.data().firstName
          setUserCollection([...usersCollection, newName]);
        })
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      })
  };

    //useEffect (substitute for ComponentDidMount) renders new user when new user is added
    useEffect(() => {
      getUsers();
      // console.log(usersCollection)
    }, []);

  return (
    <div>
      <h1>GetTest</h1>
      {
        usersCollection && 
        <div>
          {usersCollection.map(user => (
            <div> {user} </div>
          ))}
        </div>
      }
    </div>
  );
}