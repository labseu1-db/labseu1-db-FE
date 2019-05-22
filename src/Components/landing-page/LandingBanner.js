import React from 'react';
import styled from 'styled-components';

//Import icons/images
import landingPageBanner from '../../images/background-png.png';

//Import components

//Main component
export default class LandingBanner extends React.Component {
  render() {
    return (
      <StyledLandingBanner>
        <LandingHeader>
          <h1>Decision making simpler, more pleasant and much more productive</h1>
          <div>
            Pinely is a carefully designed platform for growing teams to stay on the same page, have broad discussions,
            and make the right decisions.
          </div>
        </LandingHeader>
        <img className="banner" src={landingPageBanner} alt="people using computer" />
      </StyledLandingBanner>
    );
  }
}

/*
$break-large: 1300px;
$break-large: 900px;
$break-large: 700px;
$break-small: 320px; 
*/

const StyledLandingBanner = styled.div`
  margin: 0 5vw 0 0;
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