import React from 'react';
import styled from 'styled-components';

//Import icons/images
import elisa from '../../images/elisa.png';
import ivana from '../../images/ivana.png';
import samar from '../../images/samar.png';
import sean from '../../images/sean.png';
import novina from '../../images/novina.png';
import thorben from '../../images/thorben.png';
import backgroundTeam from '../../images/background-team.svg';

//Import components

//Main component
export default class LandingTeam extends React.Component {
  render() {
    return (
      <StyledTeamContainer id="team">
        <h3>The amazing team behind Pinely</h3>
        <StyledPeopleConatiner>
          <StyledCard>
            <div className="image-div">
              <img src={elisa} alt="Elisa" />
            </div>
            <div>
              <a href="https://www.linkedin.com/in/martin-elisa/" target="_blank" rel="noopener noreferrer">
                <h5>Elisa Martin</h5>
              </a>
              <div>Fullstack Developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={ivana} alt="Ivana" />
            </div>
            <div>
              <a href="https://www.linkedin.com/in/ivana-huckova/" target="_blank" rel="noopener noreferrer">
                <h5>Ivana Huckova</h5>
              </a>
              <div>Fullstack Developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={novina} alt="Novina" />
            </div>
            <div>
              <a href="https://www.linkedin.com/in/novina-pun-7688a267/" target="_blank" rel="noopener noreferrer">
                <h5>Novina Pun</h5>
              </a>
              <div>Fullstack Developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={samar} alt="Samar" />
            </div>
            <div>
              <a href="https://www.linkedin.com/in/samar-vir/" target="_blank" rel="noopener noreferrer">
                <h5>Samar Vir</h5>
              </a>
              <div>Project Manager</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={sean} alt="Sean" />
            </div>
            <div>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <h5>Sean Attewell</h5>
              </a>
              <div>Fullstack Developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={thorben} alt="Thorben" />
            </div>
            <div>
              <a href="https://www.linkedin.com/in/thorben-bender-05aa5617a/" target="_blank" rel="noopener noreferrer">
                <h5>Thorben Bender</h5>
              </a>
              <div>Fullstack Developer</div>
            </div>
          </StyledCard>
        </StyledPeopleConatiner>
      </StyledTeamContainer>
    );
  }
}

const StyledTeamContainer = styled.div`
  width: 100%;
  padding: 25vh 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${backgroundTeam}) repeat-x 0 / 100% auto;
  min-height: 100%;
  animation: ani 90s linear infinite;
  @keyframes ani {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100vw 0;
    }
  }
  @media screen and (max-width: 1500px) {
    padding: 30vh 10vw 35vh 10vw;
  }
  @media screen and (max-width: 1000px) {
    margin: 3vh 0;
  }
  @media screen and (max-width: 800px) {
    padding: 7vh 5vw;
  }
  @media screen and (max-width: 400px) {
    padding: 7vh 3vw;
  }
  h3 {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const StyledPeopleConatiner = styled.div`
  width: 100%;
  margin: 50px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.1rem;
`;

const StyledCard = styled.div`
  width: 16%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media screen and (max-width: 1100px) {
    width: 30%;
    margin-bottom: 50px;
  }
  @media screen and (max-width: 600px) {
    width: 50%;
    margin-bottom: 50px;
  }
  h5 {
    margin: 10px 0 0 0;
    cursor: pointer;
    font-size: 1.1rem;
    &:hover {
      color: #f64d4a;
    }
    a {
      text-decoration: none;
      font-size: 1.1rem;
    }
  }
    .image-div {
    width: 50%;
    text-align: center;
    margin-bottom: 10px;
    @media screen and (max-width: 800px) {
      width: 60%;
    }
    @media screen and (max-width: 600px) {
      width: 60%;
    }
    img {
      width: 100%;
    }
  }
`;
