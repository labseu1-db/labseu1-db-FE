import React from 'react';
import styled from 'styled-components';
import ProfileOrgField from './ProfileOrgField';

function ProfileCardOrgsField(props) {
  return (
    <div>
      {props.orgs &&
        props.orgs.map(org => {
          return <ProfileOrgField org={org} user={props.user} />;
        })}
    </div>
  );
}

const StyledProfileCardOrgsField = styled.div`
  padding-top: 8px;
  flex: 1 1 0%;
  display: flex;
  padding: 16px 12px 16px 16px;
`;

export default ProfileCardOrgsField;
