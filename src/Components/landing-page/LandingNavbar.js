import React from 'react';
import styled from 'styled-components';

//Import icons/images
import treeLogo from '../../images/pinely-logo.svg';

//Import components

//Main component
export default class LandingNavbar extends React.Component {
  render() {
    return (
      <StyledNavbar>
        <NavbarContainer>
          <LeftNavbarContainer>
            <LogoContainer>
              <img className="logo" src={treeLogo} alt="logo" />
              <div className="text">
                <a href="/">Pinely</a>
              </div>
            </LogoContainer>
            <div className="navbar-item">
              {' '}
              <a href="#team" className="mobile-none">
                Team
              </a>
            </div>
            <div className="navbar-item">
              {' '}
              <a href="#pricing" className="mobile-none">
                Pricing
              </a>
            </div>
          </LeftNavbarContainer>
          <MiddleNavbarContainer />
          <RightNavbarContainer className="navbar-item sign">
            <a href="/login">Sign in</a>
          </RightNavbarContainer>
        </NavbarContainer>
      </StyledNavbar>
    );
  }
}

const StyledNavbar = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const NavbarContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .navbar-item {
    font-size: 15px;
    cursor: pointer;
    &:hover {
      color: #00bc98;
    }
  }
  .sign {
    font-weight: 600;
  }
  .mobile-none {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
`;

const LeftNavbarContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 30%;
  }
  @media screen and (max-width: 1000px) {
    width: 40%;
  }
  @media screen and (max-width: 800px) {
    width: 70%;
  }
  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .logo {
    padding-right: 10px;
    margin-right: 5px;
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

  @media screen and (max-width: 1000px) {
    width: 30%;
  }
  @media screen and (max-width: 800px) {
    width: 10%;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const RightNavbarContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: #00bc98;
    }
  }
`;
