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
                  <strong>Name: </strong>
                  {t.threadName && (
                    <span>
                      {ok} {t.threadName}
                    </span>
                  )}
                </div>
                <div>
                  <strong>Topic: </strong>
                  {t.threadTopic && (
                    <span>
                      {ok} {t.threadTopic}
                    </span>
                  )}
                </div>
                <div>
                  <strong>Created at: </strong>
                  {t.threadCreatedAt && (
                    <span>
                      {ok} {t.threadCreatedAt.seconds}
                    </span>
                  )}
                </div>
                <div>
                  <strong>Created by: </strong>
                  {t.threadCreatedByUserName && (
                    <span>
                      {ok} {t.threadCreatedByUserName}
                    </span>
                  )}
                </div>
                <div>
                  <strong>Profile: </strong>
                  {t.threadCreatedByUserId && (
                    <span>
                      {ok} www.profile.com/{t.threadCreatedByUserId}
                    </span>
                  )}
                </div>
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
