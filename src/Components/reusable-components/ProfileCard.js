import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileCardUserRow from './ProfileCardComponents/ProfileCardUserRow';
import ProfileCardOrgsField from './ProfileCardComponents/ProfileCardOrgsField';

// import Context Api
import Context from '../ContextProvider/Context';

function ProfileCard(props) {
  // use Context API
  const { getUserDataRealTime } = useContext(Context);

  // use hooks to set user data
  const [user, setUser] = useState('');

  useEffect(() => {
    getUserDataRealTime(setUser);
  }, [getUserDataRealTime]);

  return (
    <StyledProfileContainer>
      {user && (
        <ProfileCardUserRow
          user={user}
          onClick={props.resetPassword}
          secondOnClick={props.editingProfile}
          editingProfileStatus={props.editingProfileStatus}
          editingProfileDone={props.editingProfileDone}
          uuid={user.id}
          {...props}
        />
      )}
      <ProfileCardOrgsField orgs={props.orgs} user={props.user} />
    </StyledProfileContainer>
  );
}

const StyledProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4vh 3vh 3vh 3vh;
  margin-bottom: 4vh;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 10px -8px rgba(0, 0, 0, 1);
`;

export default ProfileCard;
