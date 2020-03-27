import Context from './Context';
import React, { useState } from 'react';
import { Icon, Message } from 'semantic-ui-react';
import firebase from 'firebase/app';
import styled from 'styled-components';

const ContextProvider = ({ children, ...props }) => {
  // Hooks
  const [error, setError] = useState(null);

  // Firestore
  const db = firebase.firestore();

  const isLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let request = {
          collection: 'users',
          key: 'userEmail',
          term: '==',
          value: user.email,
          type: 'redirect_to_active_org'
        };
        getDataWithWhere(request);
      }
    });
  };

  const redirect = path => {
    props.history.push(path);
  };

  const getDataWithWhere = async request => {
    try {
      let ref = db
        .collection(request.collection)
        .where(request.key, request.term, request.value);
      let querySnapshot = await ref.get();
      querySnapshot.forEach(doc => {
        handleData({ type: request.type, doc: doc });
      });
    } catch (erro) {
      setError(error);
    }
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const handleData = request => {
    switch (request.type) {
      case 'redirect_to_active_org':
        let activeOrg = request.doc.data().arrayOfOrgsIds[0];
        saveToLocalStorage('uuid', request.doc.id);
        let path = `/mainscreen/${activeOrg}`;
        redirect(path);
        break;
      default:
        console.log(request.doc.data());
    }
  };

  return (
    <Context.Provider
      value={{
        setError: setError,
        isLoggedIn: isLoggedIn,
        firebase: firebase,
        getDataWithWhere: getDataWithWhere
      }}
    >
      {children}
      {error && (
        <StyledMessage warning attached="center">
          <Icon name="warning" />
          {error.message}
        </StyledMessage>
      )}
    </Context.Provider>
  );
};

const StyledMessage = styled(Message)`
  position: absolute;
  z-index: 2;
`;

export default ContextProvider;
