import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { Form } from 'semantic-ui-react';

import {
  StyledFormDiv,
  StyledForgotPasswordPage,
  StyledParagraph,
  StyledInput,
  InputDiv
} from './styled-components/ForgotPasswordStyled';
import { StyledH1, StyledPLabel } from './styled-components/StyledText';
import { StyledLabel } from './styled-components/StyledLogin';
import { StyledButton } from './styled-components/StyledButton';
import Spinner from './semantic-components/Spinner';

class PasswordlessSubmit extends React.Component {
  state = {
    emailAddress: '',
    error: null
  };

  componentWillUpdate() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  }

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

  changeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { emailAddress } = this.state;
    const isInvalid = emailAddress === '';

    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    if (!isEmpty(this.props.auth)) {
      return null;
    }
    return (
      <StyledForgotPasswordPage>
        <StyledH1>Passwordless Sign In</StyledH1>
        <StyledFormDiv>
          <StyledParagraph>
            {
              "Please enter your email address and\nwe'll send you a link to log in"
            }
          </StyledParagraph>
          <StyledLabel>
            <StyledPLabel>Email Address</StyledPLabel>
            <StyledInput
              type='email'
              name='emailAddress'
              placeholder='tonystark@example.com'
              onChange={this.changeInput}
            />
          </StyledLabel>
          <StyledButton
            disabled={isInvalid}
            type='submit'
            onClick={event =>
              this.passwordlessSignIn(this.state.emailAddress, event)
            }
          >
            Send Email
          </StyledButton>
        </StyledFormDiv>
        <Link to='/login'>Back to Sign In</Link>
      </StyledForgotPasswordPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

//As we are not dispatching anything - this is empty
const mapDispatchToProps = {};

//Connect to Firestore
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(PasswordlessSubmit);
