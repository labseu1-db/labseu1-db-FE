import React from 'react';
import styled from 'styled-components';
import ProfileOrgField from './ProfileOrgField';

export function ProfileCardOrgsField(props) {
  return (
    <StyledProfileCardOrgsField aria-label="ProfileCardOrgsField">
      {props.orgs &&
        props.orgs.map(org => {
          return <ProfileOrgField key={org.id} org={org} user={props.user} />;
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
  margin-top: 15%;
`;

export default ProfileCardOrgsField;
