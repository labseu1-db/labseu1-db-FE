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

const StyledLandingBanner = styled.div`
  margin: 7vh 0 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  @media screen and (max-width: 1000px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 2vh 0 0 0;
  }

  .banner {
    width: 50%;
    @media screen and (max-width: 1000px) {
      width: 70%;
      margin-top: 50px;
      margin-left: 100px;
    }
    @media screen and (max-width: 800px) {
      width: 70%;
    }
    @media screen and (max-width: 700px) {
      margin-left: 70px;
    }
    @media screen and (max-width: 600px) {
      width: 80%;
    }
    @media screen and (max-width: 400px) {
      width: 100%;
      margin-left: 0;
    }
  }
`;

const LandingHeader = styled.div`
  width: 40%;
  line-height: 1.6;
  @media screen and (max-width: 1000px) {
    width: 70%;
    text-align: center;
  }
  div {
    font-size: 1.2rem;
    padding-top: 10px;
  }
  h1 {
    font-size: 2.5rem;
    @media screen and (max-width: 400px) {
      font-size: 2.3rem;
    }
  }
`;
