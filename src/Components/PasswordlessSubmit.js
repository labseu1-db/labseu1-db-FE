import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { StyledSendEmailButton } from './styled-components/StyledButton';
import {
  StyledLogin,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLoginCon,
  StyledLowerSignIn
} from './styled-components/StyledLogin';
import {
  StyledH1,
  StyledLink,
  StyledPLabel
} from './styled-components/StyledText';
import Spinner from './semantic-components/Spinner';
import LoginAnimation from './animations/LoginAnimation';

class PasswordlessSubmit extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  };

  state = {
    loginEmail: '',
    error: null
  };

  componentWillUpdate() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  passwordlessSignIn = (loginEmail, event) => {
    event.preventDefault();
    const actionCodeSettings = {
      url: 'http://localhost:3000/passwordlesscheck',
      handleCodeInApp: true
    };

    const INITIAL_STATE = {
      loginEmail: '',
      loginPassword: '',
      error: null
    };

    this.props.firebase
      .auth()
      .sendSignInLinkToEmail(loginEmail, actionCodeSettings)
      .then(function() {
        window.localStorage.setItem('emailForSignIn', loginEmail);
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error: error.message }); // not working
      });
  };

  render() {
    const { loginEmail } = this.state;
    const isInvalid = loginEmail === '';

    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    if (!isEmpty(this.props.auth)) {
      return null;
    }
    return (
      <StyledLogin>
        <StyledLoginCon>
          <StyledH1>Passwordless Sign In</StyledH1>
          <StyledForm>
            <StyledLabel>
              <StyledPLabel>Email Address</StyledPLabel>
              <StyledInput
                name='loginEmail'
                type='email'
                onChange={this.handleInputChange}
                placeholder='tonystark@example.com'
              />
            </StyledLabel>
            <StyledLowerSignIn>
              <StyledLink />
              <StyledSendEmailButton
                disabled={isInvalid}
                onClick={event => {
                  this.passwordlessSignIn(this.state.loginEmail, event);
                }}
              >
                Send Email &#62;
              </StyledSendEmailButton>
            </StyledLowerSignIn>
          </StyledForm>
          <StyledLink to='/login'>Back to Log In with Password</StyledLink>
        </StyledLoginCon>
        <LoginAnimation />
      </StyledLogin>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(PasswordlessSubmit);
