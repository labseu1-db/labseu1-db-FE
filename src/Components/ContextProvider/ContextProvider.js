import Context from './Context';
import React, { useState, useCallback, useEffect } from 'react';

// firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// import Firebase Config
import firebaseConfig from '../../firebase/firebaseConfig';

firebase.initializeApp(firebaseConfig);

const ContextProvider = ({ children, ...props }) => {
  // Hooks
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [resetPasswordStatus, setResetPasswordStatus] = useState(false);

  // Firestore
  const db = firebase.firestore();

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const mountEffectFunction = () => {
    startLoading();
    setTimeout(stopLoading, 300);
  };

  const useMountEffect = func => useEffect(func, []);

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

  const closeModal = e => {
    setModal(null);
  };

  const getUserData = async () => {
    const uuid = localStorage.getItem('uuid');
    if (uuid) {
      let request = {
        collection: 'users',
        docId: uuid
      };
      return getDataWithDoc(request);
    }
  };

  const getUserDataRealTime = useCallback(
    setData => {
      const uuid = localStorage.getItem('uuid');
      let ref = db.collection('users').doc(uuid);
      return ref.onSnapshot(doc => {
        if (doc.exists) {
          let user = doc.data();
          user.id = doc.id;
          setData(user);
        } else {
          setData('');
        }
      });
    },
    [db]
  );

  const getUsersFromOrg = useCallback(
    (setData, orgId) => {
      let ref = db
        .collection('users')
        .where('arrayOfOrgsIds', 'array-contains', orgId);
      return ref.onSnapshot(querySnapshot => {
        let users = [];
        querySnapshot.forEach(doc => {
          users.push(Object.assign({ id: doc.id }, doc.data()));
        });
        setData(users);
      });
    },
    [db]
  );

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

  const getCommentsWithThread = useCallback(
    (setData, threadId) => {
      let ref = db
        .collection('comments')
        .where('threadId', '==', threadId)
        .orderBy('commentCreatedAt', 'asc');
      return ref.onSnapshot(querySnapshot => {
        let comments = [];
        querySnapshot.forEach(doc => {
          comments.push(Object.assign({ id: doc.id }, doc.data()));
        });
        setData(comments);
      });
    },
    [db]
  );

  const getThreadsWithOrg = useCallback(
    (setData, orgId) => {
      let ref = db
        .collection('threads')
        .where('orgId', '==', orgId)
        .orderBy('threadCreatedAt', 'desc');
      return ref.onSnapshot(querySnapshot => {
        let threads = [];
        querySnapshot.forEach(doc => {
          threads.push(Object.assign({ id: doc.id }, doc.data()));
        });
        setData(threads);
      });
    },
    [db]
  );

  const getFollowUpThreads = useCallback(
    (setData, orgId) => {
      let uuid = localStorage.getItem('uuid');
      let ref = db
        .collection('threads')
        .where('isFollowUp', '==', true)
        .where('arrayOfUserIdsWhoFollowUp', 'array-contains', uuid)
        .where('orgId', '==', orgId)
        .orderBy('threadCreatedAt', 'desc');
      return ref.onSnapshot(querySnapshot => {
        let threads = [];
        querySnapshot.forEach(doc => {
          threads.push(Object.assign({ id: doc.id }, doc.data()));
        });
        setData(threads);
      });
    },
    [db]
  );

  const getThreadWithId = useCallback(
    (setData, threadId) => {
      let ref = db.collection('threads').doc(threadId);
      return ref.onSnapshot(doc => {
        if (doc.exists) {
          let comment = doc.data();
          comment.id = doc.id;
          setData(comment);
        }
      });
    },
    [db]
  );

  const getThreadsWithSpace = useCallback(
    (setData, spaceId) => {
      let ref = db
        .collection('threads')
        .where('spaceId', '==', spaceId)
        .orderBy('threadCreatedAt', 'desc');
      return ref.onSnapshot(querySnapshot => {
        let threads = [];
        querySnapshot.forEach(doc => {
          threads.push(Object.assign({ id: doc.id }, doc.data()));
        });
        setData(threads);
      });
    },
    [db]
  );

  const getSpacesWithOrg = useCallback(
    (setData, orgId) => {
      let ref = db.collection('spaces').where('orgId', '==', orgId);
      return ref.onSnapshot(querySnapshot => {
        let spaces = [];
        querySnapshot.forEach(doc => {
          spaces.push(Object.assign({ id: doc.id }, doc.data()));
        });
        setData(spaces);
      });
    },
    [db]
  );

  const getSpaceWithId = useCallback(
    (setData, spaceId) => {
      let ref = db.collection('spaces').doc(spaceId);
      return ref.onSnapshot(doc => {
        if (doc) {
          let space = doc.data();
          space.id = doc.id;
          setData(space);
        } else {
          setData('');
        }
      });
    },
    [db]
  );

  const getOrgWithUuid = useCallback(
    (setData, uuid) => {
      let ref = db
        .collection('organisations')
        .where(
          'arrayOfUsersIds',
          'array-contains',
          uuid || localStorage.getItem('uuid')
        );
      return ref.onSnapshot(querySnapshot => {
        let orgs = [];
        querySnapshot.forEach(doc => {
          orgs.push(Object.assign({ id: doc.id }, doc.data()));
        });
        setData(orgs);
      });
    },
    [db]
  );

  const getOrgWithId = useCallback(
    (setData, orgId) => {
      let ref = db.collection('organisations').doc(orgId);
      return ref.onSnapshot(doc => {
        if (doc.exists) {
          let org = doc.data();
          org.id = doc.id;
          setData(org);
        } else {
          setData('');
        }
      });
    },
    [db]
  );

  const saveData = async request => {
    try {
      let ref = db.collection(request.collection).doc(request.docId);
      await ref.set(request.data);
    } catch (error) {
      setError(error);
    }
  };

  const deleteData = async request => {
    try {
      let ref = db.collection(request.collection).doc(request.docId);
      await ref.delete();
    } catch (error) {
      setError(error);
    }
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
    let doc = await ref.get();
    let data = doc.data();
    data.id = doc.id;
    return data;
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
        return handleData({ docs, type });
      } else {
        return [];
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
        error: error,
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
        loading: loading,
        getSpacesWithOrg: getSpacesWithOrg,
        getUserData: getUserData,
        closeModal: closeModal,
        getOrgWithUuid: getOrgWithUuid,
        getOrgWithId: getOrgWithId,
        getUsersFromOrg: getUsersFromOrg,
        getSpaceWithId: getSpaceWithId,
        getThreadsWithSpace: getThreadsWithSpace,
        deleteData: deleteData,
        getThreadWithId: getThreadWithId,
        getCommentsWithThread: getCommentsWithThread,
        getFollowUpThreads: getFollowUpThreads,
        getUserDataRealTime: getUserDataRealTime,
        resetPasswordStatus: resetPasswordStatus,
        setResetPasswordStatus: setResetPasswordStatus,
        redirect: redirect,
        stopLoading: stopLoading,
        startLoading: startLoading,
        useMountEffect: useMountEffect,
        mountEffectFunction: mountEffectFunction
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
