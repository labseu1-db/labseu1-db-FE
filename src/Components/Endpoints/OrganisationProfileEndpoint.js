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
import styled from 'styled-components';

const orgDoc = '977ab9e8-5f6a-44c1-9fc7-a68c4d771701';
class OrganisationProfileEndpoint extends Component {
  render() {
    const activeOrg = this.props.organisation;
    const ok = '✅';
    return (
      <SDCard>
        <h2>Organisation Profile Endpoint</h2>
        <div>
          <SDSpan>Org Name: </SDSpan>
          {activeOrg.orgName && (
            <span>
              {ok} {activeOrg.orgName}
            </span>
          )}
        </div>
        <div>
          <SDSpan>Org Mission: </SDSpan>
          {activeOrg.orgMission && (
            <span>
              {ok} {activeOrg.orgMission}
            </span>
          )}
        </div>
        <div>
          <SDSpan>List of Users: </SDSpan>
          {activeOrg.arrayOfUsers &&
            activeOrg.arrayOfUsers.map(u => (
              <div key={u.userId}>
                <div>Id: {u.userId}</div>
                <div>Email: {u.userEmail}</div>
              </div>
            ))}
        </div>

        <div>
          <SDSpan>List of Admins: </SDSpan>
          {activeOrg.arrayOfAdmins &&
            activeOrg.arrayOfAdmins.map(u => (
              <div key={u.userId}>
                <div>Id: {u.userId}</div>
                <div>Email: {u.userEmail}</div>
              </div>
            ))}
        </div>
        <div>
          <SDSpan>Is Premium: </SDSpan>
          {activeOrg.id && (
            <span>
              {ok} {activeOrg.isPremium.toString()}
            </span>
          )}
        </div>
      </SDCard>
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
        doc: `${orgDoc}`
      }
    ];
  })
)(OrganisationProfileEndpoint);

//Styling
const SDCard = styled.div`
  line-height: 2;
  font-family: 'Helvetica';
  margin: 10px;
  padding: 10px;
  background-color: #eaeef7;
  width: 30%;
`;

const SDSpan = styled.span`
  font-weight: bold;
`;
