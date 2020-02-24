import React from 'react';
import styled from 'styled-components';

export function ProfileCardButton(props) {
  const { content, border, onClick, top, right, margin } = props;
  const style = {
    border: border,
    top: top,
    right: right,
    marginRight: margin
  };
  return (
    <ProfileCardButtonStyled
      style={style}
      onClick={onClick}
      aria-label="profile button"
    >
      {content}
    </ProfileCardButtonStyled>
  );
}

//Stylin
const ProfileCardButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0px 1.25vw;
  max-width: 10vw;
  color: #374750;
  background: white;
  border-radius: 15px;
  border: none;
  display: flex;
  position: absolute;
  height: 3vh;
  cursor: pointer;
  transition: 0.5s;
  @media screen and (max-width: 1700px) {
    font-size: 0.6rem;
  }
  &:hover {
    background: #00bc98;
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

export default ProfileCardButton;
