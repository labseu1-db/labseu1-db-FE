import React from 'react';
import styled from 'styled-components';

//Import icons/images
import productVideo from '../../images/product-video.mp4';

//Import components

//Main component
export default class LandingContent extends React.Component {
  render() {
    return (
      <StyledContent>
        <StyledContentSection>
          <video autoPlay loop muted playsInline>
            <source src={productVideo} type="video/mp4" />
          </video>
          {/* <img src={commentScreen} alt="product" /> */}
        </StyledContentSection>
        <StyledContentSection>
          <StyledDescribtionCard>
            <h3 className="green">Create an organisation</h3>
            <div className="content-div">
              We believe that Pinely will help all teams, groups, organisations and companies with comunication,
              decision making and inclusion. As an idividual, you can be member of as many organisations, as you need.
              Because every team deserves a place where you can go to get caught up on your most important discussions.
            </div>
          </StyledDescribtionCard>
          <StyledDescribtionCard>
            <h3 className="orange">Create a space</h3>
            <div className="content-div">
              Spaces are your team's meeting rooms. Once they are created, invite others and start the discussion. No
              scheduling required. Perfect for all, but especially distributed teams.
            </div>
          </StyledDescribtionCard>
          <StyledDescribtionCard>
            <h3 className="blue">Start a thread</h3>
            <div className="content-div">
              Ask questions, get feedback and hash out ideas with your team. Make better decisions with all the context
              you need in one place. And you can say goodbye to situations, where people are being left off meeting
              invites and group chats happenning in private with fewer people than before.
            </div>
          </StyledDescribtionCard>
          <StyledDescribtionCard>
            <h3 className="red">Mark the decision</h3>
            <div className="content-div">
              When you're done hearing from everyone on a thread, highlight the final decision so everyone is on the
              same page. Make decision making simpler, more pleasant and more productive.
            </div>
          </StyledDescribtionCard>
        </StyledContentSection>
      </StyledContent>
    );
  }
}

const StyledContent = styled.div`
  width: 100%;
  margin-top: 10vh;
  padding: 0 15vw;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  align-items: stretch;

  @media screen and (max-width: 1500px) {
    padding: 0 10vw;
  }
  @media screen and (max-width: 1500px) {
    padding: 0 10vw;
  }
  @media screen and (max-width: 1200px) {
    margin-top: 10vh;
  }
  @media screen and (max-width: 800px) {
    padding: 0 5vw;
  }
  @media screen and (max-width: 400px) {
    padding: 3vw;
    margin-top: 5vh;
  }
`;

const StyledContentSection = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 10vh 0;
  @media screen and (max-width: 1200px) {
    width: 46%;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
    margin: 3vh 0;
  }
  video {
    max-width: 100%;
  }
`;

const StyledDescribtionCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  .blue {
    color: #3670c6;
  }
  .red {
    color: #f64e49;
  }
  .orange {
    color: #ff8333;
  }

  .green {
    color: #29c2a5;
  }
  @media screen and (max-width: 1000px) {
    padding-bottom: 50px;
  }
  h3 {
    font-size: 2rem;
    @media screen and (max-width: 600px) {
      text-align: center;
      font-size: 1.7rem;
    }
  }
  @media screen and (max-width: 1000px) {
    text-align: center;
    font-size: 1.5rem;
  }

  div {
    font-size: 1.3rem;
    padding-bottom: 30px;
    text-align: left;
    @media screen and (max-width: 1200px) {
      padding-bottom: 10px;
      text-align: left;
    }
    @media screen and (max-width: 1000px) {
      text-align: center;
    }
    @media screen and (max-width: 600px) {
      text-align: center;
      font-size: 1.2rem;
    }
  }
`;
