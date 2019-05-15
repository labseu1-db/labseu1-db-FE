import React from 'react';
import styled from 'styled-components';

function ProfileOrgField(props) {
  return (
    <StyledProfileOrgField>
      <p>{props.org.orgName}</p>
      <p>User</p>
      <p>{props.user.userEmail}</p>
    </StyledProfileOrgField>
  );
}

const StyledProfileOrgField = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 16px 12px 16px 16px;
  margin-top: 8px;
  border-radius: 12px;
  border: 1px solid rgb(250, 249, 247);
`;

export default ProfileOrgField;
