import React from 'react';
import styled from 'styled-components';

//Import icons
import checkIconGreen from '../../../images/icon-check-green.svg';
import closeIconWhite from '../../../images/icon-close-white.svg';

//Import components
import AvatarFromLetter from '../AvatarFromLetter';
//Main component
function ThreadLeftComponentImage(props) {
  const { createdBy, checked } = props;
  return (
    <StyledImagesContainer aria-label="ThreadLeftComponentImage">
      <AvatarFromLetter username={createdBy} />
      <div className="line" />
      {checked === 'true' && (
        <div className="initial-small true">
          <img src={checkIconGreen} alt="check icon" />
        </div>
      )}
      {checked === 'false' && (
        <div className="initial-small false">
          <img src={closeIconWhite} alt="close icon" />
        </div>
      )}
    </StyledImagesContainer>
  );
}

//Styling
const StyledImagesContainer = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .initial-large {
    background-color: #00bc98;
    color: white;
    font-weight: 600;
    font-size: 1.2rem;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .initial-small {
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .true {
    background-color: white;
    border: 3px solid #00bc98;
  }
  .false {
    background-color: white;
    border: 3px solid #f64e49;
  }
  .line {
    background: linear-gradient(#bdc3c9, #bdc3c9) no-repeat center/1px 100%;
    width: 30px;
    height: 30px;
    margin: 10px 0;
  }
`;

//Default export
export default ThreadLeftComponentImage;
