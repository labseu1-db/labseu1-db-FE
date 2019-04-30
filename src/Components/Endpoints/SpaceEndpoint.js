// Endpoints for: Spaces

// - [x]  Space name
// - [x]  Users who have access to space
// For each thread:
// - [x]  Thread name
// - [x]  Thread topic
// - [x]  Date thread created
// - [x]  Full name of user who created it
// - [x]  User profile picture

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

import SpaceThreads from './SpaceEndpoint-Threads';

class SpaceEndpoint extends Component {
  render() {
    const activeSpace = this.props.space;
    const ok = '✅';

    return (
      <SDCard>
        <h2>SPACE</h2>
        <div>
          <SDSpan>Space name: </SDSpan>
          {activeSpace.spaceName && (
            <span>
              {ok} {activeSpace.spaceName}
            </span>
          )}
        </div>
        <div>
          <SDSpan>Ids of user with access: </SDSpan>
          {activeSpace.arrayOfUserIdsInSpace && (
            <span>
              {activeSpace.arrayOfUserIdsInSpace.map(id => {
                return (
                  <div key={id}>
                    {ok} {id}
                  </div>
                );
              })}
            </span>
          )}
        </div>
        <div>
          <SDSpan> Threads in space: </SDSpan>
          {activeSpace.spaceId && <SpaceThreads activeSpaceId={activeSpace.spaceId} />}
        </div>
      </SDCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    space: state.firestore.ordered.spaces ? state.firestore.ordered.spaces[0] : []
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
        collection: 'spaces',
        doc: '00d4f259-5363-4427-bd44-87f484cd44ca'
      }
    ];
  })
)(SpaceEndpoint);

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
