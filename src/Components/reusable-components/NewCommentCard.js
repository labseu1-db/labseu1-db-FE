import React from 'react';
import styled from 'styled-components';

//Import icons
import heartIconBlack from '../../images/icon-heart-black.svg';
import heartIconRed from '../../images/icon-heart-red.svg';
import { render } from 'react-testing-library';

//Main component
export default class NewCommentCard extends React.Component {
  render() {
    const { img } = this.props;
    return (
      <StyledCommentContainer>
        <StyledImageContainer>
          <img src={img} alt="authors photo" />{' '}
        </StyledImageContainer>
        <StyledRightInput placeholder="Comment on the thread" />
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
