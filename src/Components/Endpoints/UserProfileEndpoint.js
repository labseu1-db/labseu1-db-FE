// Endpoints for: User profile settings

// - [x]  Full name of user
// - [x]  Email
// - [x]  Profile picture
// - [x]  List of organisations
// - [x]  Whether user is admin or not for each org

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

class UserProfileEndpoint extends Component {
  render() {
    const activeUser = this.props.user;
    const notPassingTest = '❌';

    return (
      <SDCard>
        <h2>USER PROFILE SETTINGS</h2>
        <div>
          <SDSpan>Full Name: </SDSpan>
          {activeUser.fullName ? <span>{activeUser.fullName}</span> : <span>{notPassingTest}</span>}
        </div>
        <div>
          <SDSpan>Email: </SDSpan>
          {activeUser.userEmail ? <span>{activeUser.userEmail}</span> : <span>{notPassingTest}</span>}
        </div>
        <div>
          <SDSpan>Profile picture: </SDSpan>
          {activeUser.profileUrl ? <span>{activeUser.profileUrl}</span> : <span>{notPassingTest}</span>}
        </div>
        <div>
          <SDSpan>List of orgs: </SDSpan>
          {activeUser.arrayOfOrgs ? (
            activeUser.arrayOfOrgs.map(o => {
              return (
                <ul key={o.orgId}>
                  <li>
                    <div>{o.orgName} </div>
                    <div>admin: {o.isAdmin.toString()} </div>
                  </li>
                </ul>
              );
            })
          ) : (
            <span>{notPassingTest}</span>
          )}
        </div>
      </SDCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.firestore.ordered.users ? state.firestore.ordered.users[0] : []
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
        collection: 'users',
        doc: '035f8964-b26c-4637-9b65-11774027e9f9'
      }
    ];
  })
)(UserProfileEndpoint);

//Styling
const SDCard = styled.div`
  line-height: 2;
  font-family: 'Helvetica';
  margin: 10px;
  padding: 10px;
  background-color: #eaeef7;
`;

const SDSpan = styled.span`
  font-weight: bold;
`;
