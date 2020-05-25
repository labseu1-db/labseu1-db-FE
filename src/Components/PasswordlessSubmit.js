import React, { useState, useContext, useEffect } from 'react';
import { Icon, Message } from 'semantic-ui-react';

import { StyledSendEmailButton } from './styled-components/StyledButton';
import {
  StyledLogin,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLoginCon,
  StyledLowerSignInPasswordless
} from './styled-components/StyledLogin';
import {
  StyledH1,
  StyledLink,
  StyledPLabel
} from './styled-components/StyledText';
import LoginAnimation from './animations/LoginAnimation';

// import Context API
import Context from './ContextProvider/Context';

const PasswordlessSubmit = props => {
  // componentWillUpdate() {
  //   if (!isEmpty(props.auth)) {
  //     props.history.push('/homescreen');
  //   }
  // }

  // use Context API
  const { error, setError, firebase, isLoggedIn } = useContext(Context);

  const [loginEmail, setLoginEmail] = useState('');

  useEffect(() => {
    isLoggedIn('login');
  }, [isLoggedIn]);

  const passwordlessSignIn = (loginEmail, event) => {
    event.preventDefault();
    const actionCodeSettings = {
      url: 'https://labseu1-db-test2.firebaseapp.com/passwordlesscheck',
      handleCodeInApp: true
    };
    firebase
      .auth()
      .sendSignInLinkToEmail(loginEmail, actionCodeSettings)
      .then(function() {
        window.localStorage.setItem('emailForSignIn', loginEmail);
      })
      .then(() => {
        alert(`Email sent to ${loginEmail}`);
      })
      .then(() => {
        setLoginEmail('');
      })
      .catch(error => {
        setLoginEmail('');
        setError(error);
      });
  };

  const isInvalid = loginEmail === '';
  return (
    <StyledLogin aria-label="PasswordlessSubmit">
      <StyledLoginCon>
        <StyledH1>Passwordless Sign In</StyledH1>
        <StyledForm
          onSubmit={event => {
            passwordlessSignIn(loginEmail, event);
          }}
        >
          <StyledLabel>
            <StyledPLabel>Email Address</StyledPLabel>
            <StyledInput
              value={loginEmail}
              name="loginEmail"
              type="email"
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="tonystark@example.com"
            />
          </StyledLabel>
          <StyledLowerSignInPasswordless>
            <StyledSendEmailButton
              disabled={isInvalid}
              onClick={event => {
                passwordlessSignIn(loginEmail, event);
              }}
            >
              Send Email &#62;
            </StyledSendEmailButton>
          </StyledLowerSignInPasswordless>
        </StyledForm>
        {error && (
          <Message warning attached="bottom">
            <Icon name="warning" />
            {error.message}
          </Message>
        )}
        <StyledLink to="/login">Back to Log In with Password</StyledLink>
      </StyledLoginCon>
      <LoginAnimation />
    </StyledLogin>
  );
};

export default PasswordlessSubmit;
