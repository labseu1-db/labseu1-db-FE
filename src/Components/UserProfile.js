import React, { useContext } from 'react';
import styled from 'styled-components';
import ProfileCard from './reusable-components/ProfileCard';
import Navbar from './NavBar';
import RightSidebar from './RightSidebar';
import { Redirect } from 'react-router-dom';

// import Context API
import Context from './ContextProvider/Context';

const UserProfile = props => {
  const { resetPasswordStatus } = useContext(Context);

  if (resetPasswordStatus) {
    return <Redirect to={`/changePassword/${props.match.params.id}`} />;
  }
  return (
    <StyledMain>
      <Navbar {...props} />
      <StyledMainScreen>
        <ProfileCard {...props} />
      </StyledMainScreen>
      <RightSidebar />
    </StyledMain>
  );
};

export default UserProfile;

const StyledMain = styled.div`
  display: flex;
  width: 100vw;
  background-color: #fff7f3;
`;

const StyledMainScreen = styled.div`
  margin-left: 309px;
  background-color: #fff7f3;
  min-height: 100vh;
  padding: 10vh 12%;
  width: 100%;
`;
