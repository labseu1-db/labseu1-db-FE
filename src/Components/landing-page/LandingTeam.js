import React from 'react';
import styled from 'styled-components';

//Import icons/images
import elisa from '../../images/elisa.png';
import ivana from '../../images/ivana.png';
import samar from '../../images/samar.png';

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
              <h5>Elisa Martin</h5>
              <div>Fullstack developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={ivana} alt="Ivana" />
            </div>
            <div>
              <h5>Ivana Huckova</h5>
              <div>Fullstack developer</div>
            </div>
          </StyledCard>
          <StyledCard>
            <div className="image-div">
              <img src={samar} alt="Samar" />
            </div>
            <div>
              <h5>Samar Vir</h5>
              <div>Project Manager</div>
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
  width: 100%;
  margin-top: 10vh;
  padding: 0 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 2.3rem;
  }
`;

const StyledPeopleConatiner = styled.div`
  width: 100%;
  margin-top: 20px;
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
    .image-div {
    width: 40%;
    text-align: center;
    img {
      width: 100%;
    }
  }
`;
