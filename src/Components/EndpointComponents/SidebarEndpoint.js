/*
Sidebar
- [x]  User’s full name
- [x]  Profile picture
- [x]  List of organisation names (middle left dropdown)
- [x]  Space names for the chosen organisation 
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class SidebarEndpoint extends Component {
  render() {
    return (
      <div>
        <h2>Sidebar Endpoint</h2>
        {this.props.users.map(u => {
          return (
            <div key={u.id}>
              <div>User's name: {u.fullName}</div>
              <div>User's profile picture: {u.profileUrl}</div>
              <div>User's profile picte: {u.profileUrl}</div>
              {u.arrayOfOrgs.map(o => {
                return <div key={o.orgId}>Organisation Name: {o.orgName}</div>;
              })}
              {u.arrayOfSpaceNames.map((s, index) => {
                return <div key={index}>Space Name: {s}</div>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firestore.ordered.users ? state.firestore.ordered.users : []
  };
};

//We are not dispatching anything => mapDispatchToProps is empty
const mapDispatchToProps = {};

//Connect to Firestore
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'users'
      }
    ];
  })
)(SidebarEndpoint);
