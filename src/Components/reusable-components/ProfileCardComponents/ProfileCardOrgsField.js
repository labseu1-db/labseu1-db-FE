import React from 'react';
import styled from 'styled-components';
import ProfileOrgField from './ProfileOrgField';

function ProfileCardOrgsField(props) {
  return (
    <StyledProfileCardOrgsField>
      {props.orgs &&
        props.orgs.map(org => {
          return <ProfileOrgField org={org} user={props.user} />;
        })}
    </StyledProfileCardOrgsField>
  );
}

const StyledProfileCardOrgsField = styled.div`
  padding-top: 8px;
  flex-direction: column;
  flex: 1 1 0%;
  display: flex;
  padding: 16px 0px 16px 16px;
`;

export default ProfileCardOrgsField;
