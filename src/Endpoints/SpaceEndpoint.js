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

//Import Components
import SpaceThreads from './SpaceEndpoint-Threads';

//Doc uuid() variable for space
const spaceDoc = '020b6233-9c97-4c4a-97d6-da410cc987b2';

class SpaceEndpoint extends Component {
  render() {
    const activeSpace = this.props.space;

    return (
      <SDCard>
        <h2>Space Endpoint</h2>
        <div>
          <SDSpan>Space name: </SDSpan>
          {activeSpace.spaceName && <span>{activeSpace.spaceName}</span>}
        </div>
        <div>
          <SDSpan>Ids of user with access: </SDSpan>
          {activeSpace.arrayOfUserIdsInSpace && (
            <span>
              {activeSpace.arrayOfUserIdsInSpace.map(id => {
                return <div key={id}>• {id}</div>;
              })}
            </span>
          )}
        </div>
        <div>
          <SDSpan> Threads in space: </SDSpan>
          {activeSpace.spaceId && (
            <span>
              <SpaceThreads activeSpaceId={activeSpace.spaceId} />
            </span>
          )}
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
        doc: `${spaceDoc}`
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
