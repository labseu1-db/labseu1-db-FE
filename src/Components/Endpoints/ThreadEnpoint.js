// Endpoints for: Thread

// - [ ]  Space name
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

class ThreadEndpoint extends Component {
  render() {
    const activethread = this.props.thread;
    const ok = '✅';

    return (
      <SDCard>
        <h2>THREAD</h2>
        <div>
          <SDSpan>Thread name: </SDSpan>
          {activethread.threadName && (
            <span>
              {ok} {activethread.threadName}
            </span>
          )}
        </div>
        <div>
          <SDSpan>Thread topic: </SDSpan>
          {activethread.threadTopic && (
            <span>
              {ok} {activethread.threadTopic}
            </span>
          )}
        </div>
        <div>
          <SDSpan>Thread created at: </SDSpan>
          {activethread.threadCreatedAt && (
            <span>
              {ok} {activethread.threadCreatedAt.seconds}
            </span>
          )}
        </div>
        <div>
          <SDSpan>Thread created by: </SDSpan>
          {activethread.threadCreatedByUserName && (
            <span>
              {ok} {activethread.threadCreatedByUserName}
            </span>
          )}
        </div>
        <div>
          <SDSpan>User profile picture: </SDSpan>
          {activethread.threadCreatedByUserId && (
            <span>
              {ok} www.profile.com/{activethread.threadCreatedByUserId}
            </span>
          )}
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
        doc: '030fa39c-b9e3-4f6d-aeb4-8cf0b5a9cb0b'
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
