import React from 'react';
import styled from 'styled-components';

//Import icons/images
import penIconWhite from '../images/icon-pen-white.svg';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';

//Main component
function MainScreen() {
  return (
    <StyledMainScreen>
      <StyledFirstRow>
        <ScreenHeading heading="Home" info="Catch up on the most recent threads." />
        <ScreenButton content="Start a thread" icon={penIconWhite} backgroundColor="#5C4DF2" color="white" border="none" />
      </StyledFirstRow>
      <ScreenSectionHeading heading="Recent" />
      <ThreadCard
        createdBy="Lusten"
        createdAt="4/2 at 7:10pm"
        space="Staff"
        heading="This is called threads"
        info="It is a better place for long term discussions that is not fully integrated with Slack yet. "
        numberOfComments="5"
        numberOfLikes="6"
        checked="true"
      />
      <ThreadCard
        createdBy="Justen"
        createdAt="4/2 at 7:10pm"
        space="Staff"
        heading="This is called threads"
        info="It is a better place for long term discussions that is not fully integrated with Slack yet, but we are working on it so we have something that should clearly be awesome."
        numberOfComments="5"
        numberOfLikes="6"
        checked="false"
      />
      <ThreadCard
        createdBy="Austen"
        createdAt="4/2 at 7:10pm"
        space="Staff"
        heading="This is called threads"
        info="It is a better place for long term discussions that is not fully integrated with Slack."
        numberOfComments="5"
        numberOfLikes="6"
        checked="false"
      />
      <ThreadCard
        createdBy="Kusten"
        createdAt="4/2 at 7:10pm"
        space="Staff"
        heading="This is called threads"
        info="It is a better place for long term discussions that is not fully integrated with Slack yet, but we are working on it so we have something that should clearly be fuully integrated with Slack yet. What do you think?"
        numberOfComments="5"
        numberOfLikes="6"
        checked="true"
      />
    </StyledMainScreen>
  );
}

//Styling
const StyledMainScreen = styled.div`
  background-color: #faf9f7;
  min-height: 100vh;
  padding: 10vh 5%;
`;

const StyledFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5vh;
`;

//Default export
export default MainScreen;
