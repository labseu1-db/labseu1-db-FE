import React from 'react';
import styled from 'styled-components';

//Import icons/images
import landingPageBanner from '../../images/landing-banner-bulb.svg';

//Import components

//Main component
export default class LandingBanner extends React.Component {
  render() {
    return (
      <StyledLandingBanner aria-label="LandingBanner">
        <LandingHeader>
          <h1>
            Making decision making simpler, more pleasant and more productive
          </h1>
          <div>
            Pinely is a carefully designed platform for growing teams to stay on
            the same page, have broad discussions, and make the right decisions.
          </div>
        </LandingHeader>
        <img
          className="banner"
          src={landingPageBanner}
          alt="people using computer"
        />
      </StyledLandingBanner>
    );
  }
}

const StyledLandingBanner = styled.div`
  margin: 0vh 0 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  @media screen and (max-width: 1000px) {
    /* align-items: center;
    justify-content: center;
    flex-direction: column; */
    margin: 10vh 0 0 0;
    align-items: flex-start;
  }

  @media screen and (max-width: 800px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .banner {
    width: 55%;
    padding-top: 30px;
    @media screen and (max-width: 1500px) {
      padding-top: 0px;
      width: 50%;
      margin-top: 50px;
      margin-left: 100px;
    }

    @media screen and (max-width: 1200px) {
      padding-top: 0px;
      width: 50%;
      margin-top: -7vh;
      margin-left: 0;
    }
    @media screen and (max-width: 1000px) {
      margin-top: 0px;
      margin-left: 0px;
      width: 55%;
    }
    @media screen and (max-width: 800px) {
      width: 80%;
      height: 60%;
    }

    @media screen and (max-width: 700px) {
    }
    @media screen and (max-width: 600px) {
      width: 80%;
    }
    @media screen and (max-width: 400px) {
      width: 100%;
    }
  }
`;

const LandingHeader = styled.div`
  width: 40%;
  line-height: 1.6;
  @media screen and (max-width: 1000px) {
    width: 42%;
    text-align: center;
  }

  @media screen and (max-width: 800px) {
    margin-top: 5vh;
    width: 80%;
  }
  div {
    font-size: 1.2rem;
    padding: 10px 0;
  }
  h1 {
    font-size: 2.5rem;
    @media screen and (max-width: 400px) {
      font-size: 2rem;
    }
  }
`;
