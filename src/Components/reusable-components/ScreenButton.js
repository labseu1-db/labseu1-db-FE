import React from 'react';
import styled from 'styled-components';

function ScreenButton(props) {
  const { content, backgroundColor, color, icon, border } = props;
  const style = {
    backgroundColor: backgroundColor,
    color: color,
    border: border
  };
  return (
    <div>
      <StyledScrenButton style={style}>
        <img src={icon} alt="pen icon" />
        <div>{content}</div>
      </StyledScrenButton>
    </div>
  );
}

//Stylin
const StyledScrenButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 6px 15px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  img {
    width: 1.1rem;
    margin-right: 5px;
  }
`;

export default ScreenButton;
