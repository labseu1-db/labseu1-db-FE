/*
Company profile settings

- [x]  Organisation name
- [x]  Organisation mission
- [ ]  Logo
- [x]  User email list
- [x]  Admin list
- [x]  Subscription type
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class OrganisationProfileEndpoint extends Component {
  render() {
    return (
      <div>
        <h2>Organisation Profile Endpoint</h2>
        {this.props.organisations.map(o => {
          return (
            <div key={o.id}>
              <div>Organisation name: {o.orgName}</div>
              <div>Organisation name: {o.orgMission}</div>
              {o.arrayOfUsers.map(u => {
                return <div key={u.userId}>User: {u.userEmail}</div>;
              })}
              {o.arrayOfAdmins.map(a => {
                return <div key={a.userId}>Admin: {a.userEmail}</div>;
              })}
              <div>Premium: {o.isPremium}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    organisations: state.firestore.ordered.organisations ? state.firestore.ordered.organisations : []
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
        collection: 'organisations'
      }
    ];
  })
)(OrganisationProfileEndpoint);
