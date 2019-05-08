import React from 'react';
import styled from 'styled-components';

//Import icons
import messageIconDarkgray from '../../../images/icon-message-darkgray.svg';
import heartIconDarkgray from '../../../images/icon-heart-darkgray.svg';

//Main component
function ThreadRightComponent(props) {
  const { numberOfComments, numberOfLikes } = props;
  return (
    <StyledRightContainer>
      <div className="row-with-image">
        <img src={messageIconDarkgray} alt="message icon" />
        <div>{numberOfComments}</div>
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
      padding-top: 2px;
      width: 40%;
      margin-right: 5px;
    }
  }
`;

//Default export
export default ThreadRightComponent;
