//  WIP - needs to be checked
// Company profile settings

// - [x]  Organisation name
// - [x]  Organisation mission
// - [ ]  Logo  - image in the url/ actual image stored in the firebase cloud
// - [x]  User email list
// - [x]  Admin list
// - [x]  Subscription type

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class OrganisationProfileEndpoint extends Component {
  render() {
    return (
      <div>
        <h2>Organisation Profile Endpoint</h2>
        {this.props.organisation.orgName && <div>OrganisationName: {this.props.organisation.orgName}</div>}
        {this.props.organisation.orgMission && <div>OrganisationMission: {this.props.organisation.orgMission}</div>}
        {this.props.organisation.arrayOfUsers && (
          <div>
            arrayOfUsers:{' '}
            {this.props.organisation.arrayOfUsers.map((u, index) => (
              <div key={index}>
                userEmail: {u.userEmail} userId: {u.userId}
              </div>
            ))}
          </div>
        )}
        {this.props.organisation.arrayOfAdmins && (
          <div>
            arrayOfAdmins:{' '}
            {this.props.organisation.arrayOfAdmins.map((u, index) => (
              <div key={index}>
                userEmail: {u.userEmail} userId: {u.userId}
              </div>
            ))}
          </div>
        )}
        {this.props.organisation.isPremium && <div>Premium: {this.props.organisation.isPremium.toString()}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    organisation: state.firestore.ordered.organisations ? state.firestore.ordered.organisations[0] : []
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
        collection: 'organisations',
        doc: '977ab9e8-5f6a-44c1-9fc7-a68c4d771701'
      }
    ];
  })
)(OrganisationProfileEndpoint);
