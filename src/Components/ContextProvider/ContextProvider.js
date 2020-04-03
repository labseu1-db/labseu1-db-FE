import Context from './Context';
import React, { useState } from 'react';
import { Icon, Message } from 'semantic-ui-react';
import firebase from 'firebase/app';
import styled from 'styled-components';

const ContextProvider = ({ children, ...props }) => {
  // Hooks
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  // Firestore
  const db = firebase.firestore();

  const isLoggedIn = path => {
    firebase.auth().onAuthStateChanged(user => {
      if (user && path === 'login') {
        let request = {
          collection: 'users',
          key: 'userEmail',
          term: '==',
          value: user.email,
          type: 'redirect_to_active_org'
        };
        getDataWithWhere(request);
      } else if (user) {
      } else if (path === 'login') {
      } else {
        redirect('/login');
      }
    });
  };

  const toggleLoading = () => {
    setLoading(st => !st);
  };

  const redirect = path => {
    props.history.push(path);
  };

  const getUuid = () => {
    let uuid = localStorage.getItem('uuid');
    return uuid;
  };

  const getThreadsWithOrg = orgId => {
    let request = {
      collection: 'threads',
      key: 'orgId',
      term: '==',
      value: orgId,
      orderBy: 'threadCreatedAt',
      order: 'desc',
      type: 'return_data'
    };
    return getDataWithWhereOrdered(request);
  };

  const saveData = async request => {
    let ref = db.collection(request.collection).doc(request.docId);
    await ref.set(request.data);
    handleData({ type: request.type, data: request.docId });
  };

  const updateDataWithDoc = async request => {
    try {
      let ref = db.collection(request.collection).doc(request.docId);
      await ref.update(request.data);
    } catch (error) {
      setError(error);
    }
  };

  const getDataWithDoc = async request => {
    let ref = db.collection(request.collection).doc(request.docId);
    let doc = ref.get();
    console.log(doc);
  };

  const getDataWithWhere = async request => {
    try {
      let ref = db
        .collection(request.collection)
        .where(request.key, request.term, request.value);
      let querySnapshot = await ref.get();
      let docs = [];
      querySnapshot.forEach(doc => {
        docs.push(doc);
      });
      if (docs.length) {
        const { type } = request;
        handleData({ docs, type });
      }
    } catch (erro) {
      setError(error);
    }
  };

  const getDataWithWhereOrdered = async request => {
    try {
      let ref = db
        .collection(request.collection)
        .where(request.key, request.term, request.value)
        .orderBy(request.orderBy, request.order);
      let querySnapshot = await ref.get();
      let docs = [];
      querySnapshot.forEach(doc => {
        docs.push(doc);
      });
      if (docs.length) {
        const { type } = request;
        return handleData({ docs, type });
      }
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
        let doc = request.docs[0];
        let activeOrg = doc.data().arrayOfOrgsIds[0];
        saveToLocalStorage('uuid', doc.id);
        let path = `/mainscreen/${activeOrg}`;
        redirect(path);
        break;
      case 'save_id_to_local':
        saveToLocalStorage('uuid', request.docs[0].id);
        break;
      case 'return_data':
        let return_data = request.docs.map(doc =>
          Object.assign({ id: doc.id }, doc.data())
        );
        return return_data;
      default:
    }
  };

  return (
    <Context.Provider
      value={{
        setError: setError,
        isLoggedIn: isLoggedIn,
        firebase: firebase,
        getDataWithWhere: getDataWithWhere,
        saveData: saveData,
        updateDataWithDoc: updateDataWithDoc,
        db: db,
        getDataWithDoc: getDataWithDoc,
        getUuid: getUuid,
        getThreadsWithOrg: getThreadsWithOrg,
        setModal: setModal,
        modal: modal,
        toggleLoading: toggleLoading,
        loading: loading
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
