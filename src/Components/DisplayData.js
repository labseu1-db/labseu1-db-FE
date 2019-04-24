import React, { useState, useEffect } from 'react';
import db from './db';

export default function DisplayData() {
  const [users, setUsers] = useState([]);

  const showUsers = () => {
    db.collection('users').onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data());
      });
      setUsers(users);
    });
  };

  useEffect(() => {
    showUsers();
  }, [users]);

  return (
    <div>
      {users.map((user, index) => {
        return (
          <div key={index}>
            {user.firstName} {user.lastName}
          </div>
        );
      })}
    </div>
  );
}
