import React from 'react';
import styled from 'styled-components';

//Import icons/images
import elisa from '../../images/elisa.png';
import ivana from '../../images/ivana.png';
import samar from '../../images/samar.png';
import sean from '../../images/sean.png';
import novina from '../../images/novina.png';
import thorben from '../../images/thorben.png';

//Import components

//Main component
export default class LandingTeam extends React.Component {
  render() {
    return (
      <StyledTeamContainer id="team">
        <h3>Amazing team behing Pinely</h3>
        <StyledPeopleConatiner>
          <StyledCard>
            <div className="image-div">
              <img src={elisa} alt="Elisa" />
            </div>
            <div>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <h5>Elisa Martin</h5>
              </a>
              <div>Fullstack developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={ivana} alt="Ivana" />
            </div>
            <div>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                <h5>Ivana Huckova</h5>
              </a>
              <div>Fullstack developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={novina} alt="Novina" />
            </div>
            <div>
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
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
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
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
              <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
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
  background-color: #fff7f3;
  width: 100%;
  margin: 10vh 0;
  padding: 7vh 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1500px) {
    padding: 7vh 10vw;
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
    font-size: 2.3rem;
    text-align: center;
  }
`;

const StyledPeopleConatiner = styled.div`
  width: 100%;
  margin: 40px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
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
    &:hover {
      color: #00bc98;
    }
    a {
      text-decoration: none;
    }
  }
    .image-div {
    width: 40%;
    text-align: center;
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
