import React, { useState, useContext } from 'react';
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

// import Context API
import Context from '../../ContextProvider/Context';

//Main component
const NewCommentCard = props => {
  // state = {
  //   text: '',
  //   display: 'none',
  //   gif: ''
  // };

  // use Context API
  const {
    setError,
    error,
    saveData,
    getUserData,
    updateDataWithDoc
  } = useContext(Context);

  const [text, setText] = useState('');
  const [display, setDisplay] = useState('none');
  const [gif, setGif] = useState('');

  const handleInputChange = e => {
    let words = text.split(' ');
    let wordsWithSpecificLength = words.every(word => word.length <= 70);
    if (
      wordsWithSpecificLength ||
      e.target.name !== 'text' ||
      window.event.inputType === 'deleteContentBackward'
    ) {
      setText(e.target.value);
    }
    if (!wordsWithSpecificLength) {
      setError('wordIsTooLong');
    }
  };

  const clearInput = () => {
    setText('');
  };

  const toggleDisplay = () => {
    if (display === 'none') {
      setDisplay('block');
    }
    if (display === 'block') {
      setDisplay('none');
    }
  };

  const createNewComment = async e => {
    let commentId = uuid();
    e.preventDefault();
    let user = await getUserData();
    let request = {
      collection: 'comments',
      docId: commentId,
      data: {
        arrayOfUserIdsWhoLiked: [],
        commentBody: text,
        commentCreatedAt: Date.now(),
        commentCreatedByUserId: localStorage.getItem('uuid'),
        commentCreatedByUserName: user.fullName,
        isCommentDecided: false,
        isCommentUpdated: false,
        orgId: props.thread.orgId,
        threadId: props.thread.id,
        threadName: props.thread.threadName,
        gifUrl: gif
      }
    };
    saveData(request);
    // props.firestore.set({ collection: 'comments', doc: commentId });
    let updateRequest = {
      collection: 'threads',
      docId: props.thread.id,
      data: {
        lastCommentCreatedAt: Date.now()
      }
    };
    updateDataWithDoc(updateRequest);
    // props.firestore.update(
    //   { collection: 'threads', doc: props.thread.id },
    //   {
    //     lastCommentCreatedAt: Date.now()
    //   }
    // );
  };

  return (
    <StyledCommentContainer>
      {error === 'wordIsTooLong' && (
        <Message warning attached="bottom">
          <Icon name="warning" />A word can only be 70 characters long
        </Message>
      )}
      <StyledTopContainer>
        {props.profile.fullName && (
          <AvatarFromLetter
            username={props.profile.fullName}
            height="32px"
            width="32px"
          />
        )}
        <StyledRightInput
          placeholder="Comment on the thread"
          name="text"
          value={text}
          onChange={handleInputChange}
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
              toggleDisplay();
            }}
          />
          <ScreenButton
            content="Submit"
            backgroundColor="#00bc98"
            color="white"
            border="none"
            icon={IconPenWhite}
            onClick={e => {
              createNewComment(e);
              clearInput();
              setGif('');
            }}
          />
        </StyledButtonContainer>
        {gif !== '' && (
          <StyledGifImage>
            <img src={gif} alt="gif" />
            <div onClick={() => setGif('')}>x</div>
          </StyledGifImage>
        )}
      </StyledGifAndButtons>
      <StyledGifContainer>
        <div className={display}>
          <GifComponent
            onSelected={gif => {
              setGif(gif);
              toggleDisplay();
            }}
          />
        </div>
      </StyledGifContainer>
    </StyledCommentContainer>
  );
};

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
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect()
)(NewCommentCard);
