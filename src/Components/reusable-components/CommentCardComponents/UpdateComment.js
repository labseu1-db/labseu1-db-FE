import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Import components
import ScreenButton from '../ScreenButton';

//Import icons
import IconPenWhite from '../../../images/icon-pen-white.svg';

//Main component
export class UpdateComment extends React.Component {
  state = {
    text: this.props.content
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearInput = () => {
    this.setState({ text: '' });
  };
  updateComment = e => {
    e.preventDefault();
    let commentRef = this.props.firestore.collection('comments').doc(this.props.commentId);
    commentRef.update({
      commentBody: this.state.text,
      isCommentUpdated: true,
      commentUpdatedAt: Date.now()
    });
  };

  render() {
    return (
      <StyledCommentContainer
        onSubmit={e => {
          this.props.setIsUpdating(false);
          this.updateComment(e);
          this.clearInput();
        }}>
        <StyledTopContainer>
          <StyledInput name="text" value={this.state.text} onChange={this.handleInputChange} />
        </StyledTopContainer>
        <StyledButtonContainer>
          {this.state.text.length > 0 && (
            <ScreenButton
              content="Submit"
              backgroundColor="#5C4DF2"
              color="white"
              border="none"
              icon={IconPenWhite}
              onClick={e => {
                this.props.setIsUpdating(false);
                this.updateComment(e);
                this.clearInput();
              }}
            />
          )}
        </StyledButtonContainer>
      </StyledCommentContainer>
    );
  }
}

//Styling
const StyledCommentContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  margin-top: 30px;
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledInput = styled.input`
  margin-left: 30px;
  border: 1px solid #bdc3c9;
  width: 100%;
  border-radius: 10px;
  padding: 5px 10px;
  ::placeholder {
    color: #bdc3c9;
    font-size: 0.9rem;
  }
`;

const StyledButtonContainer = styled.div`
  align-self: flex-end;
  border: none;
  margin-top: 30px;
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
)(UpdateComment);
