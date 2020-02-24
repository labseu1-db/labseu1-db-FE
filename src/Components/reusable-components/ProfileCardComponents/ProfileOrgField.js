import React from 'react';
import styled from 'styled-components';

function ProfileOrgField(props) {
  return (
    <StyledProfileOrgField>
      <StyledOrgName>{props.org.orgName}</StyledOrgName>
      <div>
        <StyledProfileUserRole>User</StyledProfileUserRole>
        <StyledProfileUserEmail>{props.user.userEmail}</StyledProfileUserEmail>
      </div>
    </StyledProfileOrgField>
  );
}

const StyledProfileOrgField = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 16px 12px 16px 16px;
  /* justify-content: space-between; */
  margin-top: 8px;
  border-radius: 12px;
  border: 1px solid rgb(250, 249, 247);
  div {
    display: flex;
    flex-direction: column;
  }
`;

const StyledOrgName = styled.p`
  margin-left: 8px;
  font-size: 13px;
  width: 130px;
  color: rgb(125, 135, 141);
`;

const StyledProfileUserRole = styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.8px;
  color: rgb(55, 71, 80);
`;

const StyledProfileUserEmail = styled.p`
  font-size: 14px;
  color: rgb(125, 135, 141);
`;

export default ProfileOrgField;
