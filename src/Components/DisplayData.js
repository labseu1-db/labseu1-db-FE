import React, { useState, useEffect } from 'react';
import db from './db';

export default function DisplayData() {
  const [users, setUsers] = useState([]);
  const [organisations, setOrganisations] = useState([]);

  //fetchUsers listens to real-time updates and gets the data from the database
  //data are the saved in users state using
  const fetchUsers = () => {
    db.collection('users2')
      .where('email', '==', 'samar@vir.com')
      .onSnapshot(qs => {
        const users = [];
        qs.forEach(doc => {
          users.push(doc.data());
        });
        console.log(users);
        setUsers(users);
        console.log(users[0]);
        console.log(users[0].email);
      });
  };

  const fetchOrganisations = () => {
    db.collection('organisations2')
      .where('orgID', '==', 56)
      .onSnapshot(qs => {
        const organisations = [];
        qs.forEach(doc => {
          organisations.push(doc.data());
        });
        setOrganisations(organisations[0]);
        console.log(organisations[0]);
      });
  };

  //useEffect (substitute for ComponentDidMount) renders new user when new user is added
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchOrganisations();
  }, []);

  return (
    <div>
      <h2>Users in database:</h2>
      <div>{users.email}</div>
      <div>{users.fullName}</div>

      {users.organisations &&
        users.organisations.map((org, index) => {
          return <div key={index}>{org.orgName}</div>;
        })}

      {users.spaces &&
        users.spaces.map((space, index) => {
          return <div key={index}>{space.spaceName}</div>;
        })}

      <h2>Organizations in database:</h2>
      {organisations.orgName && <div>{organisations.orgName}</div>}
      {organisations.mission && <div>{organisations.mission}</div>}
      {organisations.arrayOfAdmins &&
        organisations.arrayOfAdmins.map((admin, index) => {
          return (
            <div key={index}>
              <div>{admin.userEmail}</div>
              <div>{admin.userID}</div>
            </div>
          );
        })}
    </div>
  );
}
