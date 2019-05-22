import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import styled from 'styled-components';

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

  removeDecision = e => {
    e.preventDefault();
    let commentRef = this.props.firestore.collection('comments').doc(this.props.commentId);
    commentRef.update({
      isCommentDecided: false
    });
  };

  render() {
    return (
      <StyledDropdown>
        <Dropdown>
          <Dropdown.Menu>
            {!this.props.isCommentDecided && (
              <Dropdown.Item text="Mark as Decision" onClick={e => this.markAsDecision(e)} />
            )}
            {this.props.isCommentDecided && (
              <Dropdown.Item text="Remove decision" onClick={e => this.removeDecision(e)} />
            )}
            {localStorage.getItem('uuid') === this.props.createdByUserId && (
              <Dropdown.Item text="Edit Comment" onClick={() => this.props.setIsUpdating(true)} />
            )}
            {localStorage.getItem('uuid') === this.props.createdByUserId && (
              <Dropdown.Item text="Delete Comment" onClick={() => this.props.deleteComment(this.props.commentId)} />
            )}
          </Dropdown.Menu>
        </Dropdown>
      </StyledDropdown>
    );
  }
}

//Styling
const StyledDropdown = styled.div`
  .ui.dropdown .menu > .item:hover {
    background: #00bc98;
    color: white;
  }
  .item {
    margin: 5px;
    border-radius: 5px;
  }
  .ui.label {
    background: #00bc98;
    color: white;
    border: none;
  }
  .i.icon.delete {
    color: white;
  }
`;

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
