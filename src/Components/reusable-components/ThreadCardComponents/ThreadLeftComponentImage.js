import React from 'react';
import styled from 'styled-components';

//Import icons
import checkIconWhite from '../../../images/icon-check-white.svg';
import closeIconWhite from '../../../images/icon-close-white.svg';

//Main component
function ThreadLeftComponentImage(props) {
  const { createdBy, checked } = props;
  return (
    <StyledImagesContainer>
      <div>
        <div className="initial-large">{createdBy[0]}</div>
      </div>
      <div className="line" />
      {checked === 'true' && (
        <div className="initial-small true">
          <img src={checkIconWhite} alt="check icon" />
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
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70%;
    }
  }
  .true {
    background-color: #00bc98;
  }
  .false {
    background-color: #f64e49;
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
