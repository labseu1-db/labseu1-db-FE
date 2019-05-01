import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
// import Login from './Login'

import Spinner from './semantic-components/Spinner';

const PrivateRoute = ({ component: Component, authStatus, ...rest }) => {
  if (!isLoaded(authStatus)) {
    return <Spinner />;
  }
  return (
    <Route
      {...rest}
      render={props =>
        !isEmpty(authStatus) ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

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
)(PrivateRoute);
