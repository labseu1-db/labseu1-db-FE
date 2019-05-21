import React from 'react';
import styled from 'styled-components';

//Import icons/images
import elisa from '../../images/elisa.png';
import ivana from '../../images/ivana.png';
import samar from '../../images/samar.png';
import sean from '../../images/sean.png';

//Import components

//Main component
export default class LandingTeam extends React.Component {
  render() {
    return (
      <StyledTeamContainer>
        <h3>Amazing team behing Pinely</h3>
        <StyledPeopleConatiner>
          <StyledCard>
            <div className="image-div">
              <img src={elisa} alt="Elisa" />
            </div>
            <div>
              <a href="https://www.google.com" target="_blank">
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
              <a href="https://www.google.com" target="_blank">
                <h5>Ivana Huckova</h5>
              </a>
              <div>Fullstack developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={samar} alt="Samar" />
            </div>
            <div>
              <a href="https://www.google.com" target="_blank">
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
              <a href="https://www.google.com" target="_blank">
                <h5>Sean Attawell</h5>
              </a>
              <div>Fullstack Developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <img />
            <div />
          </StyledCard>
          <StyledCard>
            <img />
            <div />
          </StyledCard>
        </StyledPeopleConatiner>
      </StyledTeamContainer>
    );
  }
}

const StyledTeamContainer = styled.div`
  background-color: #f7b8011a;
  width: 100%;
  margin-top: 10vh;
  padding: 7vh 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 2.3rem;
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
  h5 {
    margin: 10px 0 0 0;
    cursor: pointer;
    &:hover {
      color: #308c66;
    }
    a {
      text-decoration: none;
    }
  }
    .image-div {
    width: 40%;
    text-align: center;
    img {
      width: 100%;
    }
  }
`;
