import React from 'react';
import styled from 'styled-components';

import iconCardGreen from '../../images/icon-card-green.svg';
import iconLineGreen from '../../images/icon-line-green.svg';

//Main component
export default class LandingPricing extends React.Component {
  render() {
    return (
      <StyledContent id="pricing">
        <h2>Pricing</h2>
        <StyledPricingCards>
          <StyledPricingCard>
            <h2>Free</h2>
            <img src={iconLineGreen} alt="card" />
            <h2>$0</h2>

            <div className="item">Up to 20 guests</div>
            <div className="item"> Unlimited spaces</div>
            <div className="item">Access 150 most recent threads</div>
            <button className="try-button">
              <a href="/login">Try now</a>
            </button>
          </StyledPricingCard>
          <StyledPricingCard>
            <h2>Premium</h2>
            <img src={iconCardGreen} alt="card" />
            <h2>$20</h2>

            <div className="item">Up to 150 guests</div>
            <div className="item"> Unlimited spaces</div>
            <div className="item">Access to all threads</div>
            <button className="try-button">
              <a href="/login">Try now</a>
            </button>
          </StyledPricingCard>
        </StyledPricingCards>
      </StyledContent>
    );
  }
}

const StyledContent = styled.div`
  width: 100%;
  min-height: 40vh;
  margin: 10vh 0;
  padding: 0 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1500px) {
    padding: 5vh 10vw;
  }
  @media screen and (max-width: 800px) {
    padding: 5vh 5vw;
  }
  @media screen and (max-width: 400px) {
    padding: 5vh 3vw;
  }
  h2 {
    font-size: 2.5rem;
  }
`;

const StyledPricingCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const StyledPricingCard = styled.div`
  padding: 40px 10px;
  width: 20%;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 12px 0px;
  margin: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1500px) {
    width: 30%;
  }
  @media screen and (max-width: 1100px) {
    width: 35%;
  }
  @media screen and (max-width: 900px) {
    width: 50%;
  }

  @media screen and (max-width: 600px) {
    width: 70%;
  }

  @media screen and (max-width: 450px) {
    width: 90%;
  }

  h2 {
    text-align: center;
    margin: 10px 0;
    font-size: 2rem;
    color: #00bc98;
  }
  h3 {
    text-align: center;
    margin: 10px 0;
  }
  .member {
    text-align: center;
  }
  .item {
    text-align: center;

    font-weight: bold;
    padding: 10px 0;
  }

  .try-button {
    margin-top: 40px;
    padding: 10px 15px;
    color: white;
    background-color: #00bc98;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    align-self: center;
    cursor: pointer;
    &:hover {
      color: #00bc98;
      background-color: white;
      border: 2px solid #00bc98;
    }
    
    }
  }
`;
