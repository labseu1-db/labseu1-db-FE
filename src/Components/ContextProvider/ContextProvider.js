import Context from './Context';
import React, { useState } from 'react';
import { Icon, Message } from 'semantic-ui-react';
import firebase from 'firebase/app';

const ContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const isLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user);
    });
  };
  return (
    <Context.Provider value={{ setError: setError, isLoggedIn: isLoggedIn }}>
      {error && (
        <Message warning attached="bottom">
          <Icon name="warning" />
          {error.message}
        </Message>
      )}
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
