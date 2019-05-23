import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Message, Icon } from 'semantic-ui-react';

//Import components
import ScreenButton from '../ScreenButton';
import GifComponent from '../GifComponent';
import AvatarFromLetter from '../AvatarFromLetter';

//Import icons
import IconPenWhite from '../../../images/icon-pen-white.svg';
import IconCheckWhite from '../../../images/icon-check-white.svg';

//Main component
export class NewCommentCard extends React.Component {
  state = {
    text: '',
    display: 'none',
    gif: ''
  };

  handleInputChange = e => {
    let words = this.state.text.split(' ');
    let wordsWithSpecificLength = words.every(word => word.length <= 70);
    if (wordsWithSpecificLength || e.target.name !== 'text' || window.event.inputType === 'deleteContentBackward') {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ error: '' });
    }
    if (!wordsWithSpecificLength) {
      this.setState({ error: 'wordIsTooLong' });
    }
  };

  clearInput = () => {
    this.setState({ text: '' });
  };

  toggleDisplay = () => {
    if (this.state.display === 'none') {
      this.setState({
        display: 'block'
      });
    }
    if (this.state.display === 'block') {
      this.setState({
        display: 'none'
      });
    }
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
        threadName: this.props.thread.threadName,
        gifUrl: this.state.gif
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
    return (
      <StyledCommentContainer>
        {this.state.error === 'wordIsTooLong' && (
          <Message warning attached="bottom">
            <Icon name="warning" />A word can only be 70 characters long
          </Message>
        )}
        <StyledTopContainer>
          <AvatarFromLetter username={this.props.profile.fullName} height="32px" width="32px" />
          <StyledRightInput
            placeholder="Comment on the thread"
            name="text"
            value={this.state.text}
            onChange={this.handleInputChange}
          />
        </StyledTopContainer>
        <StyledGifAndButtons>
          <StyledButtonContainer>
            <ScreenButton
              content="GIF"
              backgroundColor="#00bc98"
              color="white"
              border="none"
              icon={IconCheckWhite}
              onClick={e => {
                e.preventDefault();
                this.toggleDisplay();
              }}
            />
            <ScreenButton
              content="Submit"
              backgroundColor="#00bc98"
              color="white"
              border="none"
              icon={IconPenWhite}
              onClick={e => {
                this.createNewComment(e);
                this.clearInput();
                this.setState({ gif: '' });
              }}
            />
          </StyledButtonContainer>
          {this.state.gif !== '' && (
            <StyledGifImage>
              <img src={this.state.gif} alt="gif" />
              <div onClick={() => this.setState({ gif: '' })}>x</div>
            </StyledGifImage>
          )}
        </StyledGifAndButtons>
        <StyledGifContainer>
          <div className={this.state.display}>
            <GifComponent
              onSelected={gif => {
                this.setState({ gif });
                this.toggleDisplay();
              }}
            />
          </div>
        </StyledGifContainer>
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
  padding: 30px;
  width: 100%;
  margin-top: 30px;
`;

const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledGifImage = styled.div`
  margin: 15px 0 0 66px;
  height: 100px;
  border-radius: 5px;
  display: flex;
  img {
    max-height: 100%;
    border-radius: 5px;
  }
  div {
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    margin-left: -15px;
  }
`;

const StyledGifAndButtons = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  align-items: center;
`;

const StyledRightInput = styled.input`
  margin-left: 30px;
  border: 1px solid #bdc3c9;
  width: 95%;
  border-radius: 10px;
  padding: 5px 10px;
  ::placeholder {
    color: #bdc3c9;
    font-size: 0.9rem;
  }
`;

const StyledGifContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  .none {
    display: none;
  }
  .block {
    display: block;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  border: none;
  margin-top: 30px;
  margin-right: 5px;
  button {
    margin-right: 10px;
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(NewCommentCard);
