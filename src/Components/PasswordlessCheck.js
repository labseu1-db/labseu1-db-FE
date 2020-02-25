import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';

import { StyledH1 } from './styled-components/StyledText';

export class PasswordlessCheck extends Component {
  componentDidMount() {
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
  }

  componentWillUpdate() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  }

  render() {
    return (
      <div aria-label="Passwordless Check">
        <StyledH1>Verifying User...</StyledH1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(PasswordlessCheck);
