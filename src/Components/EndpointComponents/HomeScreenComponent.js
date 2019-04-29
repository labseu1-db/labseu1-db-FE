import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

/*
Home screen

For each thread:

- [x]  Thread name
- [x]  Thread topic
- [x]  Date thread created
- [x]  Full name of user who created it
- [ ]  User profile picture
- [ ]  When was the last comment created
*/

class HomeScreenEndpoint extends Component {
  render() {
    console.log(this.props.threads);
    return (
      <div>
        <h1>Home Screen Endpoint</h1>
        {this.props.threads.map(t => {
          return (
            <div key={t.id}>
              <div>Thread name: {t.threadName}</div>
              <div>Thread topic: {t.threadTopic}</div>
              <div>Thread created at: {t.threadCreatedAt.seconds}</div>
              <div>Thread created by: {t.threadCreatedByUserName}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    threads: state.firestore.ordered.threads ? state.firestore.ordered.threads : []
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
        collection: 'threads'
      }
    ];
  })
)(HomeScreenEndpoint);
