import React from 'react';
import styled from 'styled-components';

//Import icons
import arrowIcon from '../../images/icon-arrow-left-white.svg';

function BackToButton({ onClick }) {
  return (
    <div>
      <StyledBackToButton onClick={onClick} aria-label="Back Button">
        <div className="rounded-end">
          <img src={arrowIcon} alt="arrow icon" />
        </div>
        <div className="content">Back to space</div>
      </StyledBackToButton>
    </div>
  );
}

//Stylin
const StyledBackToButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 8px 20px 8px 40px;
  border-radius: 15px;
  border: none;
  position: relative;
  color: #3d4856;
  background-color: white;
  border: 1px solid #00bc98;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #00bc98;
    border: 1px solid #00bc98;
  }
  &:focus {
    outline: none;
  }

  .rounded-end {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background-color: #00bc98;
    width: 28px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 1.1rem;
    }
    .content {
    }
  }
`;

export default BackToButton;
