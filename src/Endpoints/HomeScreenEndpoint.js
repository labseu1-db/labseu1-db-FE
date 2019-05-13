/*
Home screen
- [x]  Threads ids list
For each thread:
- [x]  Thread name
- [x]  Thread topic
- [x]  Date thread created
- [x]  Full name of user who created it
- [x]  User profile picture 
- [x]  When was the last comment created - NOT SURE IF IT WORKS, HARD TO TEST WITHOUT DATA
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import Components
import HomeScreenThreads from './HomeScreenEndpoint-Threads';

//Doc uuid() variable for thread
const userDoc = '0662c975-7bad-45f7-ae5b-b1d1c6389bf1';
const orgDoc = '0a32fa08-4098-47a7-9aa2-7d8cc68df49c';

export class HomeScreenEndpoint extends Component {
  render() {
    const activeUser = this.props.user;
    const exclamation = '❗';
    return (
      <SDCard>
        <h2>Home Screen Endpoint</h2>
        <div>{`${exclamation} before using in production we should test the latest comment - not enough data to test it out`}</div>
        <div>
          <SDSpan>Space ids list: </SDSpan>
          {activeUser.arrayOfSpaceIds && (
            <span>
              {activeUser.arrayOfSpaceIds.map(id => {
                return <div key={id}>• {id}</div>;
              })}
            </span>
          )}
        </div>

        <div>
          <SDSpan>List of threads: </SDSpan>
          {activeUser.arrayOfSpaceIds && (
            <span>
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
    user: state.firestore.ordered.homeScreenUser ? state.firestore.ordered.homeScreenUser[0] : []
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
        doc: `${userDoc}`,
        storeAs: 'homeScreenUser'
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
