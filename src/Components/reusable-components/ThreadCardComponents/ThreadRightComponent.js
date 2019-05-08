import React from 'react';
import styled from 'styled-components';

//Import icons
import messageIconDarkgray from '../../../images/icon-message-darkgray.svg';
import heartIconDarkgray from '../../../images/icon-heart-darkgray.svg';

function ThreadRightComponent(props) {
  const { numberOfComments, numberOfLikes } = props;
  return (
    <StyledRightContainer>
      <div className="row-with-image">
        <img src={messageIconDarkgray} />
        <div>{numberOfComments}</div>
      </div>
      <div className="row-with-image">
        <img src={heartIconDarkgray} />
        <div>{numberOfLikes}</div>
      </div>
    </StyledRightContainer>
  );
}

//Styling
const StyledRightContainer = styled.div`
  width: 5%;
  height: 100%;
  .row-with-image {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    img {
      width: 40%;
      margin-right: 5px;
    }
  }
`;

export default ThreadRightComponent;
