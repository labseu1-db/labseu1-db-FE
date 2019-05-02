/* Endpoints for each comment:

- [x]  Comment body
- [x]  Date comment created
- [x]  Full name of user who created it
- [x]  Array of ids of people who liked it
- [x]  Decision Boolean

- [ ]  User profile picture - WE SHOULD ADD USERID TO COMMENT 
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Doc uuid() variable for user
const commentDoc = '00ca546f-606a-4e63-9454-9ca621c74502';

class CommentEndpoint extends Component {
  render() {
    const activeComment = this.props.comment;
    return (
      <SDCard>
        <h2>Comment Endpoint</h2>
        <div>
          <SDSpan>Comment body: </SDSpan>
          {activeComment.commentBody && <span>{activeComment.commentBody}</span>}
        </div>
        <div>
          <SDSpan>Comment created at: </SDSpan>
          {activeComment.commentCreatedAt && <span>{activeComment.commentCreatedAt.seconds}</span>}
        </div>
        <div>
          <SDSpan>Comment created by: </SDSpan>
          {activeComment.commentCreatedByUserName && <span>{activeComment.commentCreatedByUserName}</span>}
        </div>
        <div>
          <SDSpan>Comment liked by these user ids: </SDSpan>
          {activeComment.arrayOfUserIdsWhoLiked && (
            <span>
              {activeComment.arrayOfUserIdsWhoLiked.map(id => {
                return <div key={id}>• {id}</div>;
              })}
            </span>
          )}
        </div>
        <div>
          <SDSpan>Comment is decision: </SDSpan>
          {activeComment.id && <span>{activeComment.isCommentDecided.toString()}</span>}
        </div>
      </SDCard>
    );
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
    return [
      {
        collection: 'comments',
        doc: `${commentDoc}`
      }
    ];
  })
)(CommentEndpoint);

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
