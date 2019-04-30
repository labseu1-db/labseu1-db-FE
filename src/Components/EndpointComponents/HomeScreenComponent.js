/*
Home screen
For each thread:
- [x]  Thread name
- [x]  Thread topic
- [x]  Date thread created
- [x]  Full name of user who created it
- [ ]  User profile picture - WE SHOULD ADD PROFILE PICTURE TO THREAD OR NOT USE IT
- [ ]  When was the last comment created - WE SHOULD KEEP DATE OF THE LATEST COMMENT
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class HomeScreenEndpoint extends Component {
  render() {
    console.log(this.props.thread);
    return (
      <div>
        <h2>HomeScreen Endpoint</h2>
        {this.props.thread.threadName && <div>{this.props.thread.threadName}</div>}
        {this.props.thread.threadTopic && <div>{this.props.thread.threadTopic}</div>}
        {this.props.thread.threadCreatedAt && <div>{this.props.thread.threadCreatedAt.seconds}</div>}
        {this.props.thread.threadCreatedByUserName && <div>{this.props.thread.threadCreatedByUserName}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    thread: state.firestore.ordered.threads ? state.firestore.ordered.threads[0] : []
  };
};

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
)(HomeScreenEndpoint);
