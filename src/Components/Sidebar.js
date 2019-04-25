import React, { useState, useEffect } from 'react';
import db from './db';

export default function DisplayData() {
  const [usersName, setUserName] = useState([]);
  const [listOfOrganisations, setListOfOrganisations] = useState([]);
  const [listOfSpaces, setListOfSpaces] = useState([]);

  //fetchUsers listens to real-time updates and gets the data from the database
  //data are the saved in users state using
  const fetchUsers = () => {
    db.collection('users2')
      .where('fullName', '==', 'Samar Vir')
      .onSnapshot(qs => {
        qs.forEach(doc => {
          setUserName(doc.data().fullName);
        });
        qs.forEach(doc => {
          setListOfOrganisations(doc.data().organisations);
        });
        qs.forEach(doc => {
          setListOfSpaces(doc.data().spaces);
        });
      });
  };

  //useEffect (substitute for ComponentDidMount) renders new user when new user is added
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Sidebar data</h1>
      <h2>User’s full name</h2>
      {usersName && <div>{usersName}</div>}

      <h2>List of organisation names (middle left dropdown)</h2>
      {listOfOrganisations &&
        listOfOrganisations.map(org => {
          return <div key={org.orgID}>{org.orgName}</div>;
        })}

      <h2>Space names for the chosen organisation</h2>
      {listOfSpaces &&
        listOfSpaces.map(space => {
          return <div key={space.spaceID}>{space.spaceName}</div>;
        })}
    </div>
  );
}
