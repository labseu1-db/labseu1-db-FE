import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Route } from 'react-router-dom';

import Register from './Components/Register';
import Login from './Components/Login';
import FakeHome from './Components/FakeHome';
import PasswordlessSubmit from './Components/PasswordlessSubmit';
import PasswordlessCheck from './Components/PasswordlessCheck';
import ForgotPassword from './Components/ForgotPassword';
import SidebarEndpoint from './Endpoints/SidebarEndpoint';
class App extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path='/register'
          render={props => <Register {...props} />}
        />
        <Route exact path='/login' render={props => <Login {...props} />} />
        <Route
          exact
          path='/homescreen'
          render={props => <FakeHome {...props} />}
        />
        <Route
          exact
          path='/passwordlesssubmit'
          render={props => <PasswordlessSubmit {...props} />}
        />
        <Route
          exact
          path='/passwordlesscheck'
          render={props => <PasswordlessCheck {...props} />}
        />
        <Route
          exact
          path='/forgotPassword'
          render={props => <ForgotPassword {...props} />}
        />
        <Route
          exact
          path='/sidebarendpoint'
          render={props => <SidebarEndpoint {...props} />}
        />
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
)(App);
