import React, { useContext, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import ProfileCardUserRow from './ProfileCardComponents/ProfileCardUserRow';
import ProfileCardOrgsField from './ProfileCardComponents/ProfileCardOrgsField';

// import Context Api
import Context from '../ContextProvider/Context';

function ProfileCard(props) {
  // use Context API
  const { getUserData } = useContext(Context);

  // use hooks to set user data
  const [user, setUser] = useState('');

  const setData = useCallback(async () => {
    let user = await getUserData();
    setUser(user);
  }, [getUserData]);

  useEffect(() => {
    setData();
  }, [setData]);

  return (
    <StyledProfileContainer>
      <ProfileCardUserRow
        user={user}
        onClick={props.resetPassword}
        secondOnClick={props.editingProfile}
        editingProfileStatus={props.editingProfileStatus}
        editingProfileDone={props.editingProfileDone}
        uuid={user.id}
      />
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
