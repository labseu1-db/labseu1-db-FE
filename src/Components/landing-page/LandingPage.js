import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//Import icons/images
import landingPageBanner from '../../images/landing-page-banner.svg';
import lineGreen from '../../images/line-green.svg';
import treeLogo from '../../images/tree-logo.png';

//Import components
import LandingNavbar from './LandingNavbar';

//Main component
export default class LandingPage extends React.Component {
  render() {
    return (
      <StyledLandingContainer>
        <TopLandingContainer>
          <LandingNavbar />
          <LandingBanner>
            <LandingHeader>
              <h1>Decision making simpler, more pleasant and much more productive</h1>
              <div>
                Pinely is a carefully designed platform for growing teams to stay on the same page, have broad
                discussions, and make the right decisions.
              </div>
            </LandingHeader>
            <img className="banner" src={landingPageBanner} alt="people using computer" />
          </LandingBanner>
        </TopLandingContainer>
      </StyledLandingContainer>
    );
  }
}

const StyledLandingContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  /* background-image: url(${lineGreen});
  background-repeat: no-repeat;
  background-size: 125vh;
  background-position-x: right;
  background-position-y: top; */
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: #308c66;
    }
  }
`;

const TopLandingContainer = styled.div`
  width: 100vw;
  height: 50vh;
  background-color: #f7b8011a;
  display: flex;
  flex-direction: column;
  .banner {
    position: absolute;
    top: 120px;
    right: 15vw;
    width: 35vw;
    z-index: 2;
  }
`;

const LandingBanner = styled.div`
  margin: 0 5vw 0 15vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  width: 25vw;
`;

const LandingHeader = styled.div`
  line-height: 1.6;
  div {
    font-size: 1.2rem;
    padding-top: 10px;
  }
  h1 {
    font-size: 2.5rem;
  }
`;
