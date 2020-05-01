import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Import icons
import heartIconBlack from '../../../images/icon-heart-black.svg';
import heartIconRed from '../../../images/icon-heart-red.svg';

//Import components
import UpdateComment from './UpdateComment';
import CommentDropdown from './CommentDropdown';
import AvatarFromLetter from '../AvatarFromLetter';

// import Context API
import Context from '../../ContextProvider/Context';

//Main component
export const CommentCard = props => {
  // use context api
  const { updateDataWithDoc, deleteData, firebase } = useContext(Context);

  const [didUserLikeComment, setDidUserLikeComment] = useState(
    props.arrayOfUsersWhoLiked.includes(localStorage.getItem('uuid'))
  );
  const [isUpdating, setUpdating] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const [text, setText] = useState(props.content);
  const [updated, setUpdated] = useState(props.isCommentUpdated);

  const toggleLikePhoto = () => {
    setDidUserLikeComment(prevState => !prevState);
  };

  const deleteComment = id => {
    let request = {
      collection: 'comments',
      docId: id
    };
    deleteData(request);
  };

  const setIsUpdating = boolean => {
    setUpdating(boolean);
  };

  const setIsHovering = boolean => {
    setHovering(boolean);
  };

  const setIsCommentUpdated = boolean => {
    setUpdated(boolean);
  };

  const {
    createdBy,
    content,
    commentId,
    likes,
    createdByUserId,
    isCommentUpdated,
    isCommentDecided,
    gifUrl
  } = props;

  const dateInfo = new Date(props.commentUpdatedAt);
  const date = `${dateInfo.getMonth()}/${dateInfo.getDate()} ${dateInfo.getHours()}:${(
    '0' + dateInfo.getMinutes()
  ).slice(-2)}`;
  return (
    <StyledContainer>
      <StyledCommentContainer
        className={`${isCommentDecided && 'paddingTop'}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isCommentDecided && (
          <StyledDecision>Marked as Decision</StyledDecision>
        )}
        {isHovering && (
          <CommentDropdown
            setIsUpdating={setIsUpdating}
            deleteComment={deleteComment}
            commentId={commentId}
            createdByUserId={createdByUserId}
            isCommentDecided={isCommentDecided}
          />
        )}
        {isUpdating && (
          <UpdateComment
            commentId={commentId}
            content={content}
            setIsUpdating={setIsUpdating}
            setIsCommentUpdated={setIsCommentUpdated}
          />
        )}
        {!isUpdating && (
          <AvatarFromLetter marginTop="4px" username={createdBy} />
        )}
        {!isUpdating && (
          <StyledRightContainer>
            <StyledAuthorsName>{createdBy}</StyledAuthorsName>
            <StyledContent>{content}</StyledContent>
            {isCommentUpdated && (
              <StyledUpdatedMessage>Updated at {date}</StyledUpdatedMessage>
            )}
            {gifUrl && <GifInComment src={gifUrl} alt="gif" />}
            <StyledLikesContainer>
              {!didUserLikeComment && (
                <img
                  src={heartIconBlack}
                  alt="heart icon"
                  onClick={() => {
                    toggleLikePhoto();
                    let request = {
                      collection: 'comments',
                      docId: commentId,
                      data: {
                        arrayOfUserIdsWhoLiked: firebase.firestore.FieldValue.arrayUnion(
                          localStorage.getItem('uuid')
                        )
                      }
                    };
                    updateDataWithDoc(request);
                  }}
                />
              )}
              {!didUserLikeComment && likes !== 0 && (
                <div className="black-likes">{likes}</div>
              )}
              {didUserLikeComment && (
                <img
                  src={heartIconRed}
                  alt="heart icon"
                  onClick={() => {
                    toggleLikePhoto();
                    let request = {
                      collection: 'comments',
                      docId: commentId,
                      data: {
                        arrayOfUserIdsWhoLiked: firebase.firestore.FieldValue.arrayRemove(
                          localStorage.getItem('uuid')
                        )
                      }
                    };
                    updateDataWithDoc(request);
                  }}
                />
              )}
              {didUserLikeComment && <div className="red-likes">{likes}</div>}
            </StyledLikesContainer>
          </StyledRightContainer>
        )}
      </StyledCommentContainer>
    </StyledContainer>
  );
};

//Styling
const StyledContainer = styled.div`
  .paddingTop {
    padding-top: 50px;
  }
  width: 100%;
`;
const StyledCommentContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 12px 0px;
  background-color: white;
  padding: 30px;
  width: 100%;
  margin-top: 50px;
  .ui.dropdown {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const StyledRightContainer = styled.div`
  padding-left: 30px;
`;
const StyledAuthorsName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 2;
  padding-bottom: 10px;
`;
const StyledContent = styled.div`
  line-height: 1.75;
  font-weight: 300;
`;
const StyledLikesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  img {
    height: 1.8rem;
    margin-right: 5px;
    cursor: pointer;
  }
  .black-likes {
    color: black;
    font-weight: 600;
  }
  .red-likes {
    color: #f64e49;
    font-weight: 600;
  }
`;

const StyledUpdatedMessage = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #bdc3c9;
  font-size: 0.8rem;
`;

const StyledDecision = styled.div`
  height: 40px;
  position: absolute;
  color: white;
  background-color: #00bc98;
  border-radius: 10px 10px 0 0;
  width: 100%;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-weight: 600;
  font-size: 0.9rem;
`;

const GifInComment = styled.img`
  max-height: 70px;
  border-radius: 5px;
  margin: 10px 0;
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
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect()
)(CommentCard);
