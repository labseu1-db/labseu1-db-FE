import React from 'react';
import { Route } from 'react-router-dom';

import Register from './Components/Register';
import Login from './Components/Login';
import PasswordlessSubmit from './Components/PasswordlessSubmit';
import PasswordlessCheck from './Components/PasswordlessCheck';
import ForgotPassword from './Components/ForgotPassword';
import CreateNewOrganisation from './Components/CreateNewOrganisation';
import UserManagement from './Components/UserManagement';
import LandingPage from './Components/landing-page/LandingPage';
import ContextProvider from './Components/ContextProvider/ContextProvider';
import SpaceThreads from './Components/SpaceThreads';
import MainScreen from './Components/MainScreen';
import ThreadsScreen from './Components/ThreadsScreen';
import FollowUp from './Components/reusable-components/FollowUp';
import UpgradeAccount from './Components/UpgradeAccount';
import UserProfile from './Components/UserProfile';

// import Context API
import Context from './Components/ContextProvider/Context';

export const App = props => {
  return (
    <ContextProvider {...props}>
      <Route exact path="/register" render={props => <Register {...props} />} />
      <Route
        exact
        path="/mainscreen/:id"
        render={props => <MainScreen {...props} />}
      />
      <Route exact path="/login" render={props => <Login {...props} />} />
      <Route
        exact
        path="/passwordlesssubmit"
        render={props => <PasswordlessSubmit {...props} />}
      />
      <Route
        exact
        path="/passwordlesscheck"
        render={props => <PasswordlessCheck {...props} />}
      />
      <Route
        exact
        path="/mainscreen/:id/:spaceId"
        render={props => <SpaceThreads {...props} />}
      />
      <Route
        exact
        path="/mainscreen/:id/:spaceId/:threadId"
        render={props => <ThreadsScreen {...props} />}
      />
      <Context.Consumer>
        {resetPasswordStatus => (
          <Route
            exact
            path={
              resetPasswordStatus ? '/changePassword/:id' : '/forgotPassword'
            }
            render={props => <ForgotPassword {...props} />}
          />
        )}
      </Context.Consumer>
      <Route
        exact
        path="/createneworganisation"
        render={props => <CreateNewOrganisation {...props} />}
      />
      <Route
        exact
        path="/users/:id"
        render={props => <UserManagement {...props} />}
      />
      <Route
        exact
        path="/follow-up/:id"
        render={props => <FollowUp {...props} />}
      />
      <Route
        exact
        path="/upgrade/:id"
        render={props => <UpgradeAccount {...props} />}
      />
      <Route
        exact
        path="/profile/:id"
        render={props => <UserProfile {...props} />}
      />
      <Route exact path="/" render={props => <LandingPage {...props} />} />
    </ContextProvider>
  );
};

export default App;
