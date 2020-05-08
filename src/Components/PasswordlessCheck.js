import React, { useEffect, useContext, useCallback } from 'react';

import { StyledH1 } from './styled-components/StyledText';

// import Context API
import Context from './ContextProvider/Context';

const PasswordlessCheck = props => {
  /* componentDidMount() {
    if (
      this.props.firebase.auth().isSignInWithEmailLink(window.location.href)
    ) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      this.props.firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch(function(error) {});
    }
  } */

  /* componentWillUpdate() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  } */

  // use Context API
  const { firebase, isLoggedIn } = useContext(Context);

  const getEmail = useCallback(async () => {
    let email = await window.prompt(
      'Please provide your email for confirmation'
    );
    firebase
      .auth()
      .signInWithEmailLink(email, window.location.href)
      .catch(function(error) {});
  }, [firebase]);
  useEffect(() => {
    isLoggedIn('login');
  }, [isLoggedIn]);

  useEffect(() => {
    getEmail();
  }, [getEmail]);

  return (
    <div>
      <StyledH1>Verifying User...</StyledH1>
    </div>
  );
};

export default PasswordlessCheck;
