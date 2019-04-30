import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import HomeScreenComments from './HomeScreenEndpoint-Comments';

class HomeScreenThreads extends Component {
  render() {
    const ok = '✅';
    return (
      <div>
        {this.props.threads &&
          this.props.threads.map(t => {
            return (
              <div key={t.threadId}>
                <div>
                  <strong>Thread Name: </strong>
                  {t.threadName && (
                    <span>
                      {ok} {t.threadName}
                    </span>
                  )}
                </div>
                <div>Id: {t.id && <span>{t.id}</span>}</div>
                <div>Topic: {t.threadTopic && <span>{t.threadTopic}</span>}</div>
                <div>Created at: {t.threadCreatedAt && <span>{t.threadCreatedAt.seconds}</span>}</div>
                <div>Created by: {t.threadCreatedByUserName && <span>{t.threadCreatedByUserName}</span>}</div>
                <div>Profile: {t.threadCreatedByUserId && <span>www.profile.com/{t.threadCreatedByUserId}</span>}</div>
                <div>Last Comment created at: {t.id && <HomeScreenComments activeThreadId={t.id} />}</div>
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
        where: [['spaceId', '==', props.activeSpaceId], ['orgId', '==', props.activeOrgId]]
      }
    ];
  })
)(HomeScreenThreads);
