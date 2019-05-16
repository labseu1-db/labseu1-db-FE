import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Semantic components
import { Dropdown } from 'semantic-ui-react';

//Main component
export class CommentDropdown extends React.Component {
  markAsDecision = e => {
    e.preventDefault();
    let commentRef = this.props.firestore.collection('comments').doc(this.props.commentId);
    commentRef.update({
      isCommentDecided: true
    });
  };

  unMarkAsDecision = e => {
    e.preventDefault();
    let commentRef = this.props.firestore.collection('comments').doc(this.props.commentId);
    commentRef.update({
      isCommentDecided: false
    });
  };

  render() {
    return (
      <Dropdown>
        <Dropdown.Menu>
          {!this.props.isCommentDecided && (
            <Dropdown.Item text="Mark as Decision" onClick={e => this.markAsDecision(e)} />
          )}
          {this.props.isCommentDecided && (
            <Dropdown.Item text="Remove decision" onClick={e => this.unMarkAsDecision(e)} />
          )}
          {localStorage.getItem('uuid') === this.props.createdByUserId && (
            <Dropdown.Item text="Edit Comment" onClick={() => this.props.setIsUpdating(true)} />
          )}
          {localStorage.getItem('uuid') === this.props.createdByUserId && (
            <Dropdown.Item text="Delete Comment" onClick={() => this.props.deleteComment(this.props.commentId)} />
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = {};

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(CommentDropdown);
