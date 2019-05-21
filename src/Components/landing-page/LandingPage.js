import React from 'react';
import styled from 'styled-components';

//Import icons/images
import landingPageBanner from '../../images/landing-page-banner.svg';
import temporaryIcon from '../../images/icon-box-darkgray.svg';
import treeLogo from '../../images/tree-logo.png';

//Import components

//Main component
export default class LandingPage extends React.Component {
  render() {
    return (
      <StyledLandingContainer>
        <TopLandingContainer>
          <StyledNavbar>
            <NavbarContainer>
              <LeftNavbarContainer>
                <LogoContainer>
                  <img className="logo" src={treeLogo} alt="logo" />
                  <div className="text">Pinely</div>
                </LogoContainer>
                <div className="navbar-item">Team</div>
                <div className="navbar-item">Pricing</div>
              </LeftNavbarContainer>
              <MiddleNavbarContainer />
              <RightNavbarContainer className="navbar-item sign">Sign in</RightNavbarContainer>
            </NavbarContainer>
          </StyledNavbar>
          <div>
            <h1 />
          </div>
          <img className="banner" src={landingPageBanner} alt="people using computer" />
        </TopLandingContainer>
      </StyledLandingContainer>
    );
  }
}

const StyledLandingContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const TopLandingContainer = styled.div`
  width: 100vw;
  min-height: 50vh;
  background-color: #f7b8011a;
  display: flex;
  flex-direction: column;

  .banner {
    position: absolute;
    top: 150px;
    right: 20vw;
    width: 35vw;
    z-index: 2;
  }
`;

const StyledNavbar = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavbarContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .navbar-item {
    font-size: 15px;
    cursor: pointer;
  }
  .sign {
    font-weight: 600;
  }
`;

const LeftNavbarContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .logo {
    padding-right: 10px;
    width: 40px;
  }
  .text {
    font-size: 26px;
    font-weight: 600;
  }
`;
const MiddleNavbarContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RightNavbarContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
