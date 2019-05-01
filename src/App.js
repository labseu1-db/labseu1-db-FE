import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Route } from 'react-router-dom';

<<<<<<< HEAD
import Register from './Components/Register';
import Login from './Components/Login';
import FakeHome from './Components/FakeHome';
// import PrivateRoute from './Components/PrivateRouteHOC';

=======
>>>>>>> 11713306571d18ece301d7ba228be3a8c9e6d11f
class App extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
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
        {/* <PrivateRoute
          path='/homescreen'
          component={FakeHome}
          authStatus={this.props.auth}
        /> */}
=======
        text
>>>>>>> 11713306571d18ece301d7ba228be3a8c9e6d11f
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
