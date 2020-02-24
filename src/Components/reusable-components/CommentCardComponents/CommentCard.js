import React from 'react';
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

//Main component
export class CommentCard extends React.Component {
  state = {
    didUserLikeComment: this.props.arrayOfUsersWhoLiked.includes(
      localStorage.getItem('uuid')
    ),
    isUpdating: false,
    isHovering: false,
    text: this.props.content
  };

  toggleLikePhoto = () => {
    this.setState(prevState => ({
      didUserLikeComment: !prevState.didUserLikeComment
    }));
  };

  deleteComment = id => {
    this.props.firestore
      .collection('comments')
      .doc(id)
      .delete();
  };

  setIsUpdating = boolean => {
    this.setState({
      isUpdating: boolean
    });
  };

  setIsHovering = boolean => {
    this.setState({
      isHovering: boolean
    });
  };

  setIsCommentUpdated = boolean => {
    this.setState({
      isCommentUpdated: boolean
    });
  };

  render() {
    const {
      createdBy,
      content,
      commentId,
      likes,
      createdByUserId,
      isCommentUpdated,
      isCommentDecided,
      gifUrl
    } = this.props;

    const dateInfo = new Date(this.props.commentUpdatedAt);
    const date = `${dateInfo.getMonth()}/${dateInfo.getDate()} ${dateInfo.getHours()}:${(
      '0' + dateInfo.getMinutes()
    ).slice(-2)}`;
    return (
      <StyledContainer aria-label="Comment Card">
        <StyledCommentContainer
          className={`${isCommentDecided && 'paddingTop'}`}
          onMouseEnter={() => this.setIsHovering(true)}
          onMouseLeave={() => this.setIsHovering(false)}
        >
          {isCommentDecided && (
            <StyledDecision>Marked as Decision</StyledDecision>
          )}
          {this.state.isHovering && (
            <CommentDropdown
              setIsUpdating={this.setIsUpdating}
              deleteComment={this.deleteComment}
              commentId={commentId}
              createdByUserId={createdByUserId}
              isCommentDecided={isCommentDecided}
            />
          )}
          {this.state.isUpdating && (
            <UpdateComment
              commentId={commentId}
              content={content}
              setIsUpdating={this.setIsUpdating}
              setIsCommentUpdated={this.setIsCommentUpdated}
            />
          )}
          {!this.state.isUpdating && (
            <AvatarFromLetter marginTop="4px" username={createdBy} />
          )}
          {!this.state.isUpdating && (
            <StyledRightContainer>
              <StyledAuthorsName>{createdBy}</StyledAuthorsName>
              <StyledContent>{content}</StyledContent>
              {isCommentUpdated && (
                <StyledUpdatedMessage>Updated at {date}</StyledUpdatedMessage>
              )}
              {gifUrl && <GifInComment src={gifUrl} alt="gif" />}
              <StyledLikesContainer>
                {!this.state.didUserLikeComment && (
                  <img
                    src={heartIconBlack}
                    alt="heart icon"
                    onClick={() => {
                      this.toggleLikePhoto();
                      let commentRef = this.props.firestore
                        .collection('comments')
                        .doc(commentId);
                      commentRef.update({
                        arrayOfUserIdsWhoLiked: this.props.firestore.FieldValue.arrayUnion(
                          localStorage.getItem('uuid')
                        )
                      });
                    }}
                  />
                )}
                {!this.state.didUserLikeComment && likes !== 0 && (
                  <div className="black-likes">{likes}</div>
                )}
                {this.state.didUserLikeComment && (
                  <img
                    src={heartIconRed}
                    alt="heart icon"
                    onClick={() => {
                      this.toggleLikePhoto();
                      let commentRef = this.props.firestore
                        .collection('comments')
                        .doc(commentId);
                      commentRef.update({
                        arrayOfUserIdsWhoLiked: this.props.firestore.FieldValue.arrayRemove(
                          localStorage.getItem('uuid')
                        )
                      });
                    }}
                  />
                )}
                {this.state.didUserLikeComment && (
                  <div className="red-likes">{likes}</div>
                )}
              </StyledLikesContainer>
            </StyledRightContainer>
          )}
        </StyledCommentContainer>
      </StyledContainer>
    );
  }
}

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
