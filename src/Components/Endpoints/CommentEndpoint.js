/*
For each comment:

- [x]  Comment body
- [x]  Date comment created
- [x]  Full name of user who created it
- [ ]  User profile picture - WE SHOULD ADD PROFILE PICTURE TO COMMENT OR NOT USE IT
- [x]  Array of ids of people who liked it
- [x]  Decision Boolean
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CommentEndpoint extends Component {
  render() {
    console.log(this.props.comment);
    return (
      <div>
        <h2>Comment Endpoint</h2>
        {this.props.comment.commentBody && <div>{this.props.comment.commentBody}</div>}
        {this.props.comment.commentCreatedAt && <div>{this.props.comment.commentCreatedAt.seconds}</div>}
        {this.props.comment.commentCreatedByUserName && <div>{this.props.comment.commentCreatedByUserName}</div>}
        {this.props.comment.isCommendDecided && <div>{this.props.comment.isCommendDecided.toString()}</div>}
        {this.props.comment.arrayOfUserIdsWhoLiked && (
          <div>
            {this.props.comment.arrayOfUserIdsWhoLiked.map(u => {
              return <div key={u}>{u}</div>;
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comment: state.firestore.ordered.comments ? state.firestore.ordered.comments[0] : []
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
        collection: 'comments',
        doc: '02233f0c-d49b-4cf5-849e-3d86e962447c'
      }
    ];
  })
)(CommentEndpoint);
