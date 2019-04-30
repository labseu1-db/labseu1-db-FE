import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Route } from 'react-router-dom';

import Register from './Components/Register';
import Login from './Components/Login';
import FakeHome from './Components/FakeHome'
import PrivateRoute from './Components/PrivateRouteHOC'


class App extends Component {
	render() {
		return (
			<div>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
        <PrivateRoute path='/homescreen' component={FakeHome} token={this.props.auth} />
			</div>
		);
	}
}

// export default App;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(App);