/*
Home screen
- [x]  Threads ids list
For each thread:
- []  Thread name
- []  Thread topic
- []  Date thread created
- []  Full name of user who created it
- [ ]  User profile picture - WE SHOULD ADD PROFILE PICTURE TO THREAD OR NOT USE IT
- [ ]  When was the last comment created - WE SHOULD KEEP DATE OF THE LATEST COMMENT
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import Components
import HomeScreenThreads from './HomeScreenEndpoint-Threads';

//Doc uuid() variable for thread
const userDoc = '035f8964-b26c-4637-9b65-11774027e9f9';
const orgDoc = '53eac322-ae74-4dd5-8cee-357104ce997a';

class HomeScreenEndpoint extends Component {
  render() {
    const activeUser = this.props.user;
    const ok = '✅';

    return (
      <SDCard>
        <h2>ENDPOINT FOR HOME SCREEN</h2>
        <div>
          <SDSpan>Threads ids list: </SDSpan>
          {activeUser.arrayOfSpaceIds && (
            <span>
              {ok}
              {activeUser.arrayOfSpaceIds.map(id => {
                return <div key={id}>{id}</div>;
              })}
            </span>
          )}
        </div>

        <div>
          <SDSpan>Threads: </SDSpan>
          {activeUser.arrayOfSpaceIds && (
            <span>
              {ok}
              {activeUser.arrayOfSpaceIds.map(id => {
                return <HomeScreenThreads key={id} activeSpaceId={id} activeOrgId={orgDoc} />;
              })}
            </span>
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
        doc: `${userDoc}`
      }
    ];
  })
)(HomeScreenEndpoint);

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
