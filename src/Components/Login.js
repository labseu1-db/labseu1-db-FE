import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import Spinner from './semantic-components/Spinner';

class Login extends Component {
  static propTypes = {
    auth: PropTypes.object,
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  };

  state = {
    loginEmail: '',
    loginPassword: '',
    error: ''
  };

  componentWillUpdate() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  passwordlessSignIn = loginEmail => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'http://localhost:3000/homescreen',
      // This must be true.
      handleCodeInApp: true
      // iOS: {
      //   bundleId: 'com.example.ios'
      // },
      // android: {
      //   packageName: 'com.example.android',
      //   installApp: true,
      //   minimumVersion: '12'
      // },
      // dynamicLinkDomain: 'localhost'
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
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', loginEmail);
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        console.log('passwordlessSignIn error:', error);
      });
  };

  render() {
    const { loginEmail, loginPassword, error } = this.state;
    const isInvalid = loginPassword === '' || loginEmail === '';

    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    if (!isEmpty(this.props.auth)) {
      return null;
    }
    return (
      <div>
        <h1>Log in!</h1>
        <Link to='/register'> Don't have an account? </Link>
        <form>
          <input
            name='loginEmail'
            type='email'
            onChange={this.handleInputChange}
          />
          <input
            name='loginPassword'
            type='password'
            onChange={this.handleInputChange}
          />
          <button
            disabled={isInvalid}
            onClick={e => {
              const INITIAL_STATE = {
                loginEmail: '',
                loginPassword: '',
                error: null
              };
              e.preventDefault();
              this.props.firebase
                .login({
                  email: this.state.loginEmail,
                  password: this.state.loginPassword
                })
                .then(() => {
                  this.setState({ ...INITIAL_STATE });
                })
                .catch(error => {
                  this.setState({ error });
                });
            }}
          >
            Login
          </button>
        </form>

        <button
          onClick={() =>
            this.props.firebase
              .login({ provider: 'google', type: 'popup' })
              .catch(error => {
                this.setState({ error });
              })
          }
        >
          Sign in with Google
        </button>
        <button onClick={() => this.passwordlessSignIn(this.state.loginEmail)}>
          Sign in with Email
        </button>
        {error && <p>{error.message}</p>}
      </div>
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
)(Login);
