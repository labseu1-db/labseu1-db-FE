import React from 'react';
import styled from 'styled-components';

//Import icons/images
import productScreen from '../../images/product-screen.png';
import commentScreen from '../../images/comment-screen.png';

//Import components

//Main component
export default class LandingContent extends React.Component {
  render() {
    return (
      <StyledContent>
        <StyledContentSection>
          <img src={productScreen} alt="product" />
        </StyledContentSection>
        <StyledContentSection>
          <StyledDescribtionCard>
            <h3>Create a tree</h3>
            <div>
              In Pinely, we call organisations trees. We want for our app to not only be used by companies, but also by
              any groups of people that work together on solving problems. We believe that Pinely will help all teams,
              unions, groups and companies with comunication, decision making and inclusion. As an idividual, you can be
              member of as many trees, as you need. Because every team deserves a place where you can go to get caught
              up on your most important discussions.
            </div>
          </StyledDescribtionCard>
          <StyledDescribtionCard>
            <h3>Create a branch</h3>
            <div>
              Spaces, or as we call them branches, are your team's meeting rooms. Once they are created, invite others
              and start the discussion. No scheduling required. Perfect for all (but especially distributed) teams.
            </div>
          </StyledDescribtionCard>
        </StyledContentSection>
        <StyledContentSection>
          <StyledDescribtionCard>
            <h3>Start a twig</h3>
            <div>
              You can call them threads, but we trully enjoy the name twigs. Ask questions, get feedback and hash out
              ideas with your team. Make better decisions with all the context you need in one place. And you can say
              goodbye to situations, where people are being left off meeting invites and group chats happenning in
              private with fewer people than before.
            </div>
          </StyledDescribtionCard>
          <StyledDescribtionCard>
            <h3>Mark the decision</h3>
            <div>
              When you're done hearing from everyone on a thread, highlight the decision (or decisions) so everyone is
              on the same page.
            </div>
          </StyledDescribtionCard>
        </StyledContentSection>
        <StyledContentSection>
          <img src={commentScreen} alt="product" />
        </StyledContentSection>
      </StyledContent>
    );
  }
}

const StyledContent = styled.div`
  width: 100%;
  margin-top: 15vh;
  padding: 0 15vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
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
  }
`;

const StyledContentSection = styled.div`
  width: 40%;
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
    :nth-child(1) {
      order: 1;
    }
    :nth-child(2) {
      order: 1;
    }
    :nth-child(3) {
      order: 4;
    }
    :nth-child(4) {
      order: 3;
    }
  }
  img {
    max-width: 100%;
  }
`;

const StyledDescribtionCard = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1000px) {
    padding-bottom: 50px;
  }
  h3 {
    font-size: 1.3rem;
    @media screen and (max-width: 1000px) {
      text-align: center;
      font-size: 1.5rem;
    }
  }
  div {
    font-size: 1.1rem;
    padding-bottom: 30px;
    @media screen and (max-width: 1200px) {
      padding-bottom: 10px;
      text-align: center;
    }
  }
`;
