import React, { useState, useEffect, useContext } from 'react';

import Context from './ContextProvider/Context';

import { Icon, Message } from 'semantic-ui-react';

// import Spinner
import Spinner from './semantic-components/Spinner';

//Import styling
import {
  StyledButton,
  ForgotPasswordDiv
} from './styled-components/StyledButton';
import {
  StyledLogin,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLoginCon,
  StyledLowerSignIn,
  StyledIcon
} from './styled-components/StyledLogin';
import {
  StyledH1,
  StyledLink,
  StyledPLabel
} from './styled-components/StyledText';

//Images/Icons
import showPassword from '../images/icon-eye-gray.svg';
import hidePassword from '../images/icon-eye-green.svg';

//Animation
import LoginAnimation from './animations/LoginAnimation';
// import { PasswordlessButton } from './styled-components/StyledButton';

const Login = props => {
  // function from context api
  const {
    setError,
    isLoggedIn,
    firebase,
    getDataWithWhere,
    redirect,
    loading,
    startLoading,
    stopLoading,
    error
  } = useContext(Context);

  const [loginEmail, setEmail] = useState('');
  const [loginPassword, setPassword] = useState('');

  useEffect(() => {
    isLoggedIn('login');
  }, [isLoggedIn]);

  const handleInputChange = e => {
    switch (e.target.name) {
      case 'loginEmail':
        setEmail(e.target.value);
        break;
      case 'loginPassword':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleLogIn = async e => {
    try {
      e.preventDefault();
      startLoading();
      let data = await firebase
        .auth()
        .signInWithEmailAndPassword(loginEmail, loginPassword);
      let { user } = data;
      let request = {
        collection: 'users',
        key: 'userEmail',
        term: '==',
        value: user.email,
        type: 'redirect_to_active_org'
      };
      getDataWithWhere(request);
    } catch (error) {
      console.log('error', error);
      stopLoading();
      setError(error);
    }
  };

  const togglePassword = () => {
    let temp = document.getElementById('typepass');
    let passwordIcon = document.getElementById('passwordIcon');
    if (temp.type === 'password') {
      temp.type = 'text';
      passwordIcon.src = hidePassword;
      passwordIcon.alt = 'hidePassword';
    } else {
      temp.type = 'password';
      passwordIcon.src = showPassword;
      passwordIcon.alt = 'showPassword';
    }
  };

  const isInvalid = loginPassword === '' || loginEmail === '';
  if (loading) {
    return <Spinner />;
  }

  return (
    <StyledLogin aria-label="Login page">
      <StyledLoginCon>
        <StyledH1>Sign in</StyledH1>
        <StyledForm onSubmit={handleLogIn}>
          <StyledLabel>
            <StyledPLabel>Email</StyledPLabel>
            <StyledInput
              name="loginEmail"
              value={loginEmail}
              type="email"
              onChange={handleInputChange}
              placeholder="tonystark@example.com"
            />
          </StyledLabel>
          <StyledLabel>
            <StyledPLabel>Password</StyledPLabel>
            <StyledInput
              id="typepass"
              name="loginPassword"
              value={loginPassword}
              type="password"
              onChange={handleInputChange}
              placeholder="········"
            />
            <StyledIcon
              id="passwordIcon"
              src={showPassword}
              alt="showPassword"
              onClick={togglePassword}
            />
          </StyledLabel>
          <ForgotPasswordDiv onClick={() => redirect('/forgotPassword')}>
            Forgot Password?
          </ForgotPasswordDiv>
          <StyledLowerSignIn>
            <StyledLink to="/register"> Don't have an account? </StyledLink>
            <StyledButton disabled={isInvalid} onClick={handleLogIn}>
              Sign In
            </StyledButton>
          </StyledLowerSignIn>
        </StyledForm>
        {error && (
          <Message warning attached="bottom">
            <Icon name="warning" />
            {error.message}
          </Message>
        )}
        {/* <Button
            color='google plus'
            onClick={() =>
              props.firebase
                .login({
                  provider: 'google',
                  type: 'popup'
                })
                .then(res => {
                  setUserIdInLocalStorage(res.profile.email);
                })
            }
          >
            <Icon name='google plus' /> Sign in with Google
          </Button> */}
        {/* <PasswordlessButton onClick={() => props.history.push('/passwordlesssubmit')}>
            Email Me a Link to Sign In
          </PasswordlessButton> */}
      </StyledLoginCon>
      <LoginAnimation />
    </StyledLogin>
  );
};

export default Login;
