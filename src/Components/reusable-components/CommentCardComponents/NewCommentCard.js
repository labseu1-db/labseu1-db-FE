import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Import components
import ScreenButton from '../ScreenButton';

//Import icons
import IconPenWhite from '../../../images/icon-pen-white.svg';

//Main component
export class NewCommentCard extends React.Component {
  state = {
    text: ''
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearInput = () => {
    this.setState({ text: '' });
  };
  createNewComment = e => {
    e.preventDefault();
    let commentId = uuid();
    this.props.firestore.set(
      { collection: 'comments', doc: commentId },
      {
        arrayOfUserIdsWhoLiked: [],
        commentBody: this.state.text,
        commentCreatedAt: Date.now(),
        commentCreatedByUserId: localStorage.getItem('uuid'),
        commentCreatedByUserName: this.props.profile.fullName,
        isCommentDecided: false,
        isCommentUpdated: false,
        orgId: this.props.thread.orgId,
        threadId: this.props.thread.id,
        threadName: this.props.thread.threadName
      }
    );
    this.props.firestore.update(
      { collection: 'threads', doc: this.props.thread.id },
      {
        lastCommentCreatedAt: Date.now()
      }
    );
  };

  render() {
    const { img } = this.props;
    return (
      <StyledCommentContainer
        onSubmit={e => {
          this.createNewComment(e);
          this.clearInput();
        }}>
        <StyledTopContainer>
          <StyledImageContainer>
            <img src={img} alt="author" /> {/* <div className="initials">{createdBy[0]}</div> */}
          </StyledImageContainer>
          <StyledRightInput
            placeholder="Comment on the thread"
            name="text"
            value={this.state.text}
            onChange={this.handleInputChange}
          />
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
                this.createNewComment(e);
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
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 12px 0px;
  background-color: white;
  padding: 20px;
  width: 100%;
  margin-top: 30px;
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledImageContainer = styled.div`
  width: 35px;
  height: 35px;
  img {
    border-radius: 50%;
    max-height: 100%;
  }
  .initials {
    border-radius: 50%;
    max-width: 100%;
    background-color: #5c4df2;
  }
`;
const StyledRightInput = styled.input`
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(NewCommentCard);
