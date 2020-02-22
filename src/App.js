import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { Route } from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";
import PasswordlessSubmit from "./Components/PasswordlessSubmit";
import PasswordlessCheck from "./Components/PasswordlessCheck";
import ForgotPassword from "./Components/ForgotPassword";
import CreateNewOrganisation from "./Components/CreateNewOrganisation";
import UserManagement from "./Components/UserManagement";
import LandingPage from "./Components/landing-page/LandingPage";
import VideoChat from "./Components/VideoChat";
import SpaceThreads from "./Components/SpaceThreads";
import MainScreen from "./Components/MainScreen";
import ThreadsScreen from "./Components/ThreadsScreen";
import FollowUp from "./Components/reusable-components/FollowUp";
import UpgradeAccount from "./Components/UpgradeAccount";
import UserProfile from "./Components/UserProfile";

class App extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path='/register'
          render={props => <Register {...props} />}
        />
        <Route
          exact
          path='/mainscreen/:id'
          render={props => <MainScreen {...props} />}
        />
        <Route exact path='/login' render={props => <Login {...props} />} />
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
          path='/mainscreen/:id/:spaceId'
          render={props => <SpaceThreads {...props} />}
        />
        <Route
          exact
          path='/mainscreen/:id/:spaceId/:threadId'
          render={props => <ThreadsScreen {...props} />}
        />
        <Route
          exact
          path={
            this.props.resetPasswordStatus
              ? "/changePassword/:id"
              : "/forgotPassword"
          }
          render={props => <ForgotPassword {...props} />}
        />
        <Route
          exact
          path='/createneworganisation'
          render={props => <CreateNewOrganisation {...props} />}
        />
        <Route exact path='/' render={props => <LandingPage {...props} />} />
        <Route
          exact
          path='/video/:id/:spaceId/:roomId'
          render={props => <VideoChat {...props} />}
        />
        <Route
          exact
          path='/users/:id'
          render={props => <UserManagement {...props} />}
        />
        <Route
          exact
          path='/follow-up/:id'
          render={props => <FollowUp {...props} />}
        />
        <Route
          exact
          path='/upgrade/:id'
          render={props => <UpgradeAccount {...props} />}
        />
        <Route
          exact
          path='/profile/:id'
          render={props => <UserProfile {...props} />}
        />
        <Route exact path='/' render={props => <LandingPage {...props} />} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    resetPasswordStatus: state.resetPassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearFirestore: () => dispatch({ type: "@@reduxFirestore/CLEAR_DATA" })
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firebaseConnect()
)(App);
