import React from 'react';
import styled from 'styled-components';

//Main component
export default class LandingPricing extends React.Component {
  render() {
    return (
      <StyledContent id="pricing">
        <h2>Pricing</h2>
        <StyledPricingCards>
          <StyledPricingCard>
            <h2>Free</h2>
            <h3>$0 member/month</h3>
            <div className="item">Up to 20 guests</div>
            <div className="item"> Unlimited spaces</div>
            <div className="item">Access 150 most recent threads</div>
            <button className="try-button">
              <a href="/login">Try now</a>
            </button>
          </StyledPricingCard>
          <StyledPricingCard>
            <h2>Premium</h2>
            <h3>$10 member/month</h3>
            <div className="item">Up to 20 guests</div>
            <div className="item"> Unlimited spaces</div>
            <div className="item">Access 150 most recent threads</div>
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
  h2 {
    font-size: 2.3rem;
  }
`;

const StyledPricingCards = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledPricingCard = styled.div`
  padding: 40px 10px;
  width: 20%;
  background-color: #4c4c781a;
  margin: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    margin: 10px 0;
    font-size: 2rem;
    color: #4c4c78;
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
    color: #4c4c78;
    font-weight: bold;
    padding: 10px 0;
  }

  .try-button {
    margin-top: 40px;
    padding: 10px 15px;
    color: white;
    background-color: #4c4c78;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    align-self: center;
    cursor: pointer;
    &:hover {
      background-color: #fbd98c;
    }
    a {
      &:hover {
        color: white;
      }
    }
  }
`;
