// Endpoints for: Thread
// - [x]  Space name
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

//Import components
import ThreadSpace from './ThreadEndpoint-Space';

//Doc uuid() variable for thread
const threadDoc = '030fa39c-b9e3-4f6d-aeb4-8cf0b5a9cb0b';

class ThreadEndpoint extends Component {
  render() {
    const activeThread = this.props.thread;

    return (
      <SDCard>
        <h2>Thread Endpoint</h2>
        <div>
          <SDSpan>Space name: </SDSpan>
          {activeThread.spaceId && (
            <span>
              <ThreadSpace activeSpaceId={activeThread.spaceId} />
            </span>
          )}
        </div>
        <div>
          <SDSpan>Thread name: </SDSpan>
          {activeThread.threadName && <span>{activeThread.threadName}</span>}
        </div>
        <div>
          <SDSpan>Thread topic: </SDSpan>
          {activeThread.threadTopic && <span>{activeThread.threadTopic}</span>}
        </div>
        <div>
          <SDSpan>Thread created at: </SDSpan>
          {activeThread.threadCreatedAt && <span>{activeThread.threadCreatedAt.seconds}</span>}
        </div>
        <div>
          <SDSpan>Thread created by: </SDSpan>
          {activeThread.threadCreatedByUserName && <span>{activeThread.threadCreatedByUserName}</span>}
        </div>
        <div>
          <SDSpan>User profile picture: </SDSpan>
          {activeThread.threadCreatedByUserId && <span>www.profile.com/{activeThread.threadCreatedByUserId}</span>}
        </div>
      </SDCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    thread: state.firestore.ordered.threads ? state.firestore.ordered.threads[0] : []
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
        collection: 'threads',
        doc: `${threadDoc}`
      }
    ];
  })
)(ThreadEndpoint);

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
