import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class SpaceThreads extends Component {
  render() {
    const ok = '✅';
    return (
      <div>
        {this.props.threads &&
          this.props.threads.map(t => {
            return (
              <div key={t.threadId}>
                <div>
                  {' '}
                  {ok}
                  <strong>Name: </strong>
                  {t.threadName}
                </div>
                <div>Topic: {t.threadTopic}</div>
                <div>Created at: {t.threadCreatedAt.seconds}</div>
                <div>Created by: {t.threadCreatedByUserName}</div>
                <div>Prrofile: www.profile.com/{t.threadCreatedByUserId}</div>
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
    if (!props.activeSpaceId) return [];
    return [
      {
        collection: 'threads',
        where: [['spaceId', '==', props.activeSpaceId]]
      }
    ];
  })
)(SpaceThreads);
