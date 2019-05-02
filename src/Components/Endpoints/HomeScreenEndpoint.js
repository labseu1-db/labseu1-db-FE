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
const userDoc = '035f8964-b26c-4637-9b65-11774027e9f9';
const orgDoc = '53eac322-ae74-4dd5-8cee-357104ce997a';

export class HomeScreenEndpoint extends Component {
  render() {
    const activeUser = this.props.user;
    const exclamation = '❗';
    return (
      <SDCard>
        <h2>Home Screen Endpoint</h2>
        <div>{`${exclamation}WE SHOULD TEST THE LATEST COMMENT IN THREAD - NOT ENOUGH DATA ATM${exclamation}`}</div>
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