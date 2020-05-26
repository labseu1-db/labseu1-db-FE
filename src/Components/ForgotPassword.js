import React, { useState, useContext, useEffect } from 'react';

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
import { Icon, Message } from 'semantic-ui-react';

// import Context API
import Context from './ContextProvider/Context';

const ForgotPassword = props => {
  /* state = {
    loginEmail: '',
    error: null
  };

  INITIAL_STATE = {
    loginEmail: '',
    error: null
  }; */

  // use Context API
  const {
    error,
    setError,
    resetPasswordStatus,
    firebase,
    setResetPasswordStatus,
    redirect
  } = useContext(Context);

  const [loginEmail, setLoginEmail] = useState('');

  const submitHandler = (email, event) => {
    event.preventDefault();
    firebase
      .resetPassword(email)
      .then(() => {
        if (resetPasswordStatus) {
          setResetPasswordStatus(false);
          redirect(`/profile/${props.match.params.id}`);
        } else {
          redirect('/login');
        }
      })
      .catch(error => {
        setError(error);
      });
  };

  useEffect(() => {
    if (!resetPasswordStatus) {
      redirect(`/mainscreen/${props.match.params.id}`);
    }
  }, [redirect, props.match.params.id, resetPasswordStatus]);

  const handleInputChange = e => {
    setLoginEmail(e.target.value);
  };

  const isInvalid = loginEmail === '';
  return (
    <StyledLogin aria-label="ForgotPassword">
      <StyledLoginCon>
        <StyledH1>Reset Password</StyledH1>
        <StyledForm
          onSubmit={event => {
            submitHandler(loginEmail, event);
          }}
        >
          <StyledLabel>
            <StyledPLabel>Email Address</StyledPLabel>
            <StyledInput
              name="loginEmail"
              value={loginEmail}
              type="email"
              onChange={handleInputChange}
              placeholder="tonystark@example.com"
            />
          </StyledLabel>
          <StyledLowerSignInPasswordless>
            <StyledSendEmailButton
              disabled={isInvalid}
              onClick={event => {
                submitHandler(loginEmail, event);
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
        {!resetPasswordStatus && (
          <StyledLink to="/login">Back to Log In</StyledLink>
        )}
        {resetPasswordStatus && (
          <StyledSendEmailButton
            onClick={() => {
              redirect(`/profile/${props.match.params.id}`);
              props.resetPasswordDone();
            }}
          >
            Cancel
          </StyledSendEmailButton>
        )}
      </StyledLoginCon>
      <LoginAnimation />
    </StyledLogin>
  );
};

//Connect to Firestore
export default ForgotPassword;
