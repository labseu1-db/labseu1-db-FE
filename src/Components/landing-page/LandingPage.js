import React from 'react';
import styled from 'styled-components';

//Import components
import LandingNavbar from './LandingNavbar';
import LandingBanner from './LandingBanner';
import LandingContent from './LandingContent';
import LandingMidBanner from './LandingMidBanner';
import LandingTeam from './LandingTeam';
import LandingPricing from './LandingPricing';
import LandingFooter from './LandingFooter';

//Main component
export default class LandingPage extends React.Component {
  render() {
    return (
      <StyledLandingContainer>
        <TopLandingContainer>
          <LandingNavbar />
          <LandingBanner />
        </TopLandingContainer>
        <LandingContent />
        <LandingTeam />
        <LandingMidBanner />
        <LandingPricing />

        <LandingFooter />
      </StyledLandingContainer>
    );
  }
}

const StyledLandingContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  letter-spacing: 1.1;
  line-height: 1.7;
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: #00bc98;
    }
  }
`;

const TopLandingContainer = styled.div`
  width: 100%;
  height: 75vh;
  padding: 0 15vw;
  /* background-color: #00bc9866; */
  display: flex;
  flex-direction: column;
  &::after {
    content: '';
    background-color: #00bc9866;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100px;
    -webkit-transform: skewY(3deg);
    -ms-transform: skewY(3deg);
    transform: skewy(-7deg);
    -webkit-transform-origin: 70%;
    -ms-transform-origin: 70%;
    transform-origin: 0;
    z-index: -1;
  }

  @media screen and (max-width: 1500px) {
    padding: 0 10vw;
  }
  @media screen and (max-width: 1000px) {
    height: 100vh;
  }
  @media screen and (max-width: 800px) {
    padding: 0 5vw;
  }
  @media screen and (max-width: 400px) {
    padding: 0 3vw;
  }
`;
