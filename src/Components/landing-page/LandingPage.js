import React from 'react';
import styled from 'styled-components';

//Import icons/images
import productScreen from '../../images/product.png';

//Import components
import LandingNavbar from './LandingNavbar';
import LandingBanner from './LandingBanner';

//Main component
export default class LandingPage extends React.Component {
  render() {
    return (
      <StyledLandingContainer>
        <TopLandingContainer>
          <LandingNavbar />
          <LandingBanner />
        </TopLandingContainer>
        <StyledContent>
          <StyledContentSection>
            <div>
              <img src={productScreen} alt="product" />
            </div>
          </StyledContentSection>
          <StyledContentSection>
            <StyledDescribtionCard>
              <h3>Create organisations</h3>
              <div>
                In Pinely, we call organisations trees. This is because we want our app to be used not only by
                companies, but also by any group of people that work together on solving problems. We believe that
                Pinely will help all teams, unions, groups and companies with comunication, decision making and
                inclusion. As an idividual, you can be member of as many trees, as you need. Every Company deserves a
                “front page” where you can go to get caught up on your most important discussions. Using this new web
                app users will be able to participate in forum conversations where people can share news, content, or
                comment on other people’s posts
              </div>
            </StyledDescribtionCard>
            <StyledDescribtionCard>
              <h3>Create a space</h3>
              <div>
                This is your team's virtual meeting room. Once created, invite others and start your discussion - no
                scheduling required.
              </div>
            </StyledDescribtionCard>
            <StyledDescribtionCard>
              <h3>Start a thread</h3>
              <div>
                Ask questions, get feedback and hash out ideas with your team. Make better decisions with all the
                context you need in one place.
              </div>
            </StyledDescribtionCard>
            <StyledDescribtionCard>
              <h3>Mark the decision</h3>
              <div>
                When you're done hearing from everyone on a thread, highlight the decision so everyone is on the same
                page.
              </div>
            </StyledDescribtionCard>
          </StyledContentSection>
        </StyledContent>
      </StyledLandingContainer>
    );
  }
}

const StyledLandingContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  letter-spacing: 1.1;
  line-height: 1.7;
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: #308c66;
    }
  }
`;

const TopLandingContainer = styled.div`
  width: 100%;
  height: 60vh;
  padding: 0 15vw;
  background-color: #f7b8011a;
  display: flex;
  flex-direction: column;
  .banner {
    position: absolute;
    top: 20vh;
    right: 10vw;
    width: 40vw;
    z-index: 2;
  }
`;

const StyledContent = styled.div`
  width: 100%;
  margin-top: 30vh;
  height: 50vh;
  padding: 0 15vw;
  display: flex;
  justify-content: space-between;
`;

const StyledContentSection = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  img {
    max-width: 100%;
  }
`;

const StyledDescribtionCard = styled.div`
  margin-bottom: 10vh;

  h3 {
    font-size: 1.3rem;
  }
  div {
    font-size: 1.1rem;
  }
`;
