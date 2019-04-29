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
    return (
      <div>
        <h2>Comment Endpoint</h2>
        {this.props.comments.map(c => {
          return (
            <div key={c.id}>
              <div>Comment body: {c.commentBody}</div>
              <div>Comment created at: {c.commentCreatedAt.seconds}</div>
              <div>Comment created by: {c.commentCreatedByUserName}</div>
              <div>Comment created by: {c.commentCreatedByUserName}</div>
              <div>Is comments decision: {c.isCommentDecided}</div>
              {c.arrayOfUserIdsWhoLiked.map(u => {
                return <div key={u}>Ids of users who liked the comment: {u}</div>;
              })}
            </div>
          );
        })}
        {this.props.users.map(u => {
          return (
            <div key={u.id}>
              <div>User profile picture: {u.profileUrl}</div>
            </div>
          );
        })}
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
