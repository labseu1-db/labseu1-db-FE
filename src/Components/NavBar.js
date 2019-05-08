import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

export default function NavBar() {
  return (
    <NavBarContainer>
      <HeaderContainer className='nav-bar-user-information'>
        <InnerContainerHorizontal>
          <StyledImage src='http://lorempixel.com/640/480' alt='user' />
          <div>Samar Victoryman</div>
          <Icon name='chevron down' />
        </InnerContainerHorizontal>
        <div>
          <Icon name='cog' />
        </div>
      </HeaderContainer>
      <InnerContainer className='nav-bar-main-section'>
        <HomeContainer className='home-screen-link'>
          <Icon name='home' size='large' />
          <span>Home</span>
        </HomeContainer>

        <InnerContainer className='org-menu'>
          <InnerContainer className='organisation-component'>
            <OuterOrgContainer>
              <OrgContainer className='organisation-name'>
                <Icon name='building outline' size='large' />
                <span>Organisation name</span>
              </OrgContainer>
              <div>
                <Icon name='plus' size='small' />
              </div>
            </OuterOrgContainer>
            <InnerContainer className='space'>space 1</InnerContainer>
            <InnerContainer className='space'>space 2</InnerContainer>
            <InnerContainer className='space'>space 3</InnerContainer>
            <InnerContainer className='space'>space 4</InnerContainer>
          </InnerContainer>
        </InnerContainer>
      </InnerContainer>
    </NavBarContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const InnerContainerHorizontal = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const InnerContainer = styled.div`
  /* border: 1px solid pink; */
`;

const HomeContainer = styled(InnerContainerHorizontal)`
  margin-top: 130px;
  align-items: baseline;
`;

const OrgContainer = styled(InnerContainerHorizontal)`
  margin-top: 50px;
  margin-bottom: 20px;
  align-items: baseline;
`;

const OuterOrgContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const NavBarContainer = styled.div`
  border: 1px solid pink;
  height: 100vh;
  width: 220px;
  padding-left: 15px;
  padding-right: 12px;
`;

const StyledImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 7px;
`;
