import React from 'react';
import styled from 'styled-components';

//Import icons/images
import productScreen from '../../images/product.png';

//Import components
import LandingNavbar from './LandingNavbar';
import LandingBanner from './LandingBanner';
import LandingContent from './LandingContent';
import LandingMidBanner from './LandingMidBanner';
import LandingTeam from './LandingTeam';

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
        <LandingMidBanner />
        <LandingTeam />
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
      color: #308c66;
    }
  }
`;

const TopLandingContainer = styled.div`
  width: 100%;
  height: 60vh;
  padding: 0 15vw;
  background-color: #f7b8011a;
  display: flex;
  flex-direction: column;
  .banner {
    position: absolute;
    top: 20vh;
    right: 10vw;
    width: 40vw;
    z-index: 2;
  }
`;
