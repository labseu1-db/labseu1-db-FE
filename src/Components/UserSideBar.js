import React from 'react';
import styled from 'styled-components';

const UserSideBar = props => {
  const { userForSideBar } = props;
  return (
    <StyledUserSideBar>
      {userForSideBar.map(user => (
        <div key={user.key}>
          <p>{user.text}</p>
        </div>
      ))}
    </StyledUserSideBar>
  );
};

export default UserSideBar;

const StyledUserSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #fff7f3;
  color: #3d4856;
  height: 100vh;
  width: 30%;
  padding-right: 5%;
  background-color: #fff7f3;
`;
