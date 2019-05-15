import React from 'react';
import styled from 'styled-components';

function ProfileCardButton(props) {
  const { content, backgroundColor, color, border, onClick, top, right } = props;
  const style = {
    backgroundColor: backgroundColor,
    color: color,
    border: border,
    top: top,
    right: right
  };
  return (
    <div>
      <ProfileCardButtonStyled style={style} onClick={onClick}>
        <div>{content}</div>
      </ProfileCardButtonStyled>
    </div>
  );
}

//Stylin
const ProfileCardButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0px 24px;
  border-radius: 15px;
  border: none;
  display: flex;
  position: absolute;
  height: 31px;
  cursor: pointer;
  color: blue;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #5c4df2;
    color: white;
  }
`;

export default ProfileCardButton;
