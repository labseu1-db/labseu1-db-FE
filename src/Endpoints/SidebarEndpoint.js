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
import styled from 'styled-components';

const userDoc = '04d12a5c-aa73-4f14-a6ce-1ec6a85d78f5';
export class SidebarEndpoint extends Component {
  render() {
    const activeUser = this.props.user;
    return (
      <SDCard>
        <h2>Sidebar Endpoint</h2>
        <div>
          <SDSpan>Full Name: </SDSpan>
          {activeUser.fullName && <span>{activeUser.fullName}</span>}
        </div>
        <div>
          <SDSpan>List of organisation names: </SDSpan>
          {activeUser.arrayOfOrgs && (
            <div>
              {activeUser.arrayOfOrgs.map((org, idx) => (
                <div key={idx}>
                  <span>• {org.orgName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <SDSpan>List of space names: </SDSpan>
          {activeUser.arrayOfSpaceNames && (
            <div>
              {activeUser.arrayOfSpaceNames.map((space, index) => (
                <div key={index}>
                  <span>• {space}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {activeUser.id && (
          <div>
            <SDSpan>Profile: </SDSpan>
            <span>www.profile.com/{activeUser.id}</span>
          </div>
        )}
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
        doc: `${userDoc}`
      }
    ];
  })
)(SidebarEndpoint);

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
