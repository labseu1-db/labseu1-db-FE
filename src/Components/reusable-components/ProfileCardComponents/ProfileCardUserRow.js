import React from 'react';
import styled from 'styled-components';
import ProfileCardButton from './ProfileCardButton';

function ProfileCardUserRow(props) {
  const { onClick } = props;
  return (
    <StyledFirstRow>
      <img src={props.user.profileUrl} />
      <span>{props.user.fullName}</span>
      <ProfileCardButton
        content="Change Password"
        border="solid 0.5px #37475026"
        top="0px"
        right="125px"
        onClick={onClick}
      />
      <ProfileCardButton content="Edit Profile" border="solid 0.5px #37475026" top="0px" right="0px" />
    </StyledFirstRow>
  );
}

export default ProfileCardUserRow;

const StyledFirstRow = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  img {
    width: 95px;
    height: 95px;
    border-radius: 300px;
    margin-top: 14px;
    margin-left: 20px;
    margin-right: 40px;
  }
  span {
    width: 400px;
    font-size: 32px;
    font-weight: 300;
    color: rgb(55, 71, 80);
    padding-top: 10px;
    overflow-wrap: break-word;
    margin-top: 40px;
  }
`;
