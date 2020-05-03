import React from 'react';
import styled from 'styled-components';
import ProfileCard from './reusable-components/ProfileCard';
import { Redirect } from 'react-router-dom';
import Navbar from './NavBar';
import RightSidebar from './RightSidebar';

const UserProfile = props => {
  /* if (props.resetPasswordStatus) {
    return <Redirect to={`/changePassword/${this.props.match.params.id}`} />;
  } */
  return (
    <StyledMain>
      <Navbar {...props} />
      <StyledMainScreen>
        <ProfileCard />
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
