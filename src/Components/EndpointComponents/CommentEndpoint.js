/*
For each comment:

- [x]  Comment body
- [x]  Date comment created
- [x]  Full name of user who created it
- [x]  User profile picture
- [x]  Array of ids of people who liked it
- [x]  Decision Boolean
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CommentEndpoint extends Component {
  render() {
    const firstComment = this.props.comments[0];
    return (
      <div>
        <h2>Comment Endpoint</h2>
        <div>
          Comment body:{' '}
          {firstComment ? (
            <span> {firstComment.commentBody}</span>
          ) : (
            <span role="img" aria-label="crying">
              😢
            </span>
          )}
        </div>
        {firstComment && <div>Comment created at: {firstComment.commentCreatedAt.seconds}</div>}
        {firstComment && <div>Comment created by: {firstComment.commentCreatedByUserName}</div>}
        {firstComment && <div>Is comments decision: {firstComment.isCommentDecided.toString()}</div>}

        {/* {c.arrayOfUserIdsWhoLiked.map(u => {
                return <div key={u}>Ids of users who liked the comment: {u}</div>;
              })}
            </div> */}

        {/* {this.props.users.map(u => {
          return (
            <div key={u.id}>
              <div>User profile picture: {u.profileUrl}</div>
            </div>
          );
        })} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.firestore.ordered.comments ? state.firestore.ordered.comments : [],
    users: state.firestore.ordered.users ? state.firestore.ordered.users : []
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
        collection: 'comments'
      },
      {
        collection: 'users'
      }
    ];
  })
)(CommentEndpoint);
