import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';

class FakeHome extends Component {
  componentDidMount() {
    // Confirm the link is a sign-in with email link.
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
        .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          console.log('sign in with email error:', error);
        });
    }
  }

  componentWillUpdate() {
    if (!isEmpty(this.props.auth)) {
      this.props.history.push('/homescreen');
    }
  }

  render() {
    // if (!isLoaded(this.props.auth)) {
    //   return <Spinner />;
    // }

    return (
      <div>
        <h1>Verifying User...</h1>
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
)(FakeHome);
