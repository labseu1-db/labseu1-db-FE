import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Button, Icon } from 'semantic-ui-react';

import { StyledButton } from './styled-components/StyledButton';
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

class Register extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  };

  state = {
    email: '',
    password: '',
    fullName: '',
    error: null
  };

  componentWillUpdate() {
    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    if (isLoaded(this.props.auth) && !isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createAndLogInNewUser = ({ email, password, fullName }) => {
    this.props.firebase
      .createUser({ email, password }, { fullName, email })
      .then(() => {
        this.props.firebase.login({ email, password });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { email, password, fullName, error } = this.state;
    const isInvalid = email === '' || password === '' || fullName === '';

    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    if (!isEmpty(this.props.auth)) {
      return null;
    }
    return (
      <StyledLogin>
        <StyledLoginCon>
          <StyledH1>Register</StyledH1>
          <StyledForm>
            <StyledLabel>
              <StyledPLabel>Full Name</StyledPLabel>
              <StyledInput
                name='fullName'
                type='text'
                onChange={this.handleInputChange}
                placeholder='Tony Stark'
              />
            </StyledLabel>
            <StyledLabel>
              <StyledPLabel>Email</StyledPLabel>
              <StyledInput
                name='email'
                type='email'
                onChange={this.handleInputChange}
                placeholder='tonystark@example.com'
              />
            </StyledLabel>
            <StyledLabel>
              <StyledPLabel>Password</StyledPLabel>
              <StyledInput
                name='password'
                type='password'
                onChange={this.handleInputChange}
                placeholder='········'
              />
            </StyledLabel>

            <StyledLowerSignIn>
              <StyledLink to='/login'> Already have an account? </StyledLink>
              <StyledButton
                disabled={isInvalid}
                onClick={e => {
                  e.preventDefault();
                  this.createAndLogInNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    fullName: this.state.fullName
                  })
                }}
              >
                Register
              </StyledButton>
            </StyledLowerSignIn>
          </StyledForm>

          <Button
            color='google plus'
            onClick={() =>
              this.props.firebase.login({ provider: 'google', type: 'popup' })
            }
          >
            <Icon name='google plus' /> Sign in with Google
          </Button>
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
)(Register);
