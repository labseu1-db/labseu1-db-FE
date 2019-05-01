import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class HomeScreenComments extends Component {
  render() {
    return <span>{this.props.comment.commentCreatedAt && <span>{this.props.comment.commentCreatedAt.seconds}</span>}</span>;
  }
}

const mapStateToProps = state => {
  return {
    comment: state.firestore.ordered.comments ? state.firestore.ordered.comments[0] : []
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
        collection: 'comments',
        where: [['threadId', '==', props.activeThreadId]],
        orderBy: ['commentCreatedAt.seconds', 'desc'],
        limit: 1
      }
    ];
  })
)(HomeScreenComments);
