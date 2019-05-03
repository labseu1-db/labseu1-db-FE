import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Button, Icon } from 'semantic-ui-react';

import { StyledSendEmailButton } from './styled-components/StyledButton';
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
import Spinner from './semantic-components/Spinner';
import LoginAnimation from './animations/LoginAnimation';
import { PasswordlessButton } from './styled-components/StyledButton';
import showPassword from '../images/showPassword.svg';

class PasswordlessSubmit extends Component {
  static propTypes = {
        firestore: PropTypes.shape({
            add: PropTypes.func.isRequired
        }).isRequired
    };

    state = {
        loginEmail: '',
        error: null
    }

    // const INITIAL_STATE = {
    //   loginEmail: '',
    //   error: null
    // };

    submitHandler = (email, event) => {
        event.preventDefault();
        this.props.firebase.resetPassword(email).then(
            () => {
                console.log('it worked')
            }
        ).catch(error => {
            console.log(error);
        })
    }

    componentWillUpdate() {
        if (!isEmpty(this.props.auth)) {
            this.props.history.push('/homescreen');
        }
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
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
          <StyledH1>Reset Password</StyledH1>
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
                  this.submitHandler(this.state.loginEmail, event);
                }}
              >
                Send Email &#62;
              </StyledSendEmailButton>
            </StyledLowerSignIn>
          </StyledForm>
          <StyledLink to='/login'>Back to Log In</StyledLink>
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