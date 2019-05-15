import React from 'react';
import styled from 'styled-components';

//Import components
import BackToButton from './reusable-components/BackToButton';
import ScreenHeading from './reusable-components/ScreenHeading';
import ThreadInformationCard from './reusable-components/ThreadInformationCard';
import CommentCard from './reusable-components/CommentCard';
import NewCommentCard from './reusable-components/NewCommentCard';

//Main component
export default class ThreadsScreen extends React.Component {
  render() {
    return (
      <StyledEnvironmentContainer>
        <StyledThreadScreen>
          <StyledThreadContent>
            <BackToButton />
            <StyledHeadingContainer>
              <ScreenHeading heading="Thread" />
            </StyledHeadingContainer>
            <ThreadInformationCard
              img="https://pbs.twimg.com/profile_images/961263385202561024/H6hygos5.jpg"
              createdBy="Ivana Huckova"
              createdAt="5/8 at 2:57 pm"
              space="Product"
              info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
            />
            <CommentCard
              img="https://pbs.twimg.com/profile_images/961263385202561024/H6hygos5.jpg"
              createdBy="Ivana Huckova"
              createdAt="5/8 at 2:57 pm"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
              likes={20}
            />
            <NewCommentCard
              img="https://pbs.twimg.com/profile_images/961263385202561024/H6hygos5.jpg"
              createdBy="Ivana Huckova"
            />
          </StyledThreadContent>
        </StyledThreadScreen>
      </StyledEnvironmentContainer>
    );
  }
}

//Styling
const StyledEnvironmentContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0;
`;

const StyledThreadScreen = styled.div`
  width: 70%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #faf9f7;
  padding: 30px 10px 10px 0;
  padding: 10vh 5%;
`;

const StyledThreadContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

const StyledHeadingContainer = styled.div`
  margin: 40px 0 30px 0;
`;
