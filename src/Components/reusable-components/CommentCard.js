import React from 'react';
import styled from 'styled-components';

//Import icons
import heartIconBlack from '../../images/icon-heart-black.svg';
import heartIconRed from '../../images/icon-heart-red.svg';

//Main component
export default class CommentCard extends React.Component {
  state = {
    didUserLikeComment: false
  };

  toggleLikePhoto = () => {
    this.setState(prevState => ({
      didUserLikeComment: !prevState.didUserLikeComment
    }));
  };

  render() {
    const { img, createdBy, likes, content } = this.props;
    return (
      <StyledCommentContainer>
        <StyledImageContainer>
          <img src={img} alt="author" />{' '}
        </StyledImageContainer>
        <StyledRightContainer>
          <StyledAuthorsName>{createdBy}</StyledAuthorsName>
          <StyledContent>{content}</StyledContent>
          <StyledLikesContainer>
            {!this.state.didUserLikeComment && (
              <img src={heartIconBlack} alt="heart icon" onClick={() => this.toggleLikePhoto()} />
            )}
            {!this.state.didUserLikeComment && <div className="black-likes">{likes}</div>}
            {this.state.didUserLikeComment && (
              <img src={heartIconRed} alt="heart icon" onClick={() => this.toggleLikePhoto()} />
            )}
            {this.state.didUserLikeComment && <div className="red-likes">{likes + 1}</div>}
          </StyledLikesContainer>
        </StyledRightContainer>
      </StyledCommentContainer>
    );
  }
}

//Styling
const StyledCommentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 12px 0px;
  padding: 20px;
  width: 50%;
  margin-top: 30px;
`;
const StyledImageContainer = styled.div`
  width: 35px;
  height: 35px;
  img {
    border-radius: 50%;
    max-height: 100%;
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
