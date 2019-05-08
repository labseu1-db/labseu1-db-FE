import React from 'react';
import styled from 'styled-components';

//Import icons/images
import penIconWhite from '../images/icon-pen-white.svg';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenSectionHeading from './reusable-components/ScreenSectionHeading';
import ScreenButton from './reusable-components/ScreenButton';
import ThreadCard from './reusable-components/ThreadCard';

export default function MainScreen() {
  return (
    <StyledMainScreen>
      <ScreenHeading heading="Home" info="Catch up on the most recent threads." />
      <ScreenButton content="Start a thread" icon={penIconWhite} backgroundColor="#5C4DF2" color="white" border="none" />
      <ScreenSectionHeading heading="Recent" />
      <ThreadCard
        createdBy="Austen"
        createdAt="4/2 at 7:10pm"
        space="Staff"
        heading="This is called threads"
        info="It is a better place for long term discussions that is not fully integrated with Slack yet,but we are working on it so we have something that should clearly be..."
        numberOfComments="5"
        numberOfLikes="6"
        checked="false"
      />
    </StyledMainScreen>
  );
}

const StyledMainScreen = styled.div`
  background-color: #faf9f7;
  min-height: 100vh;
  padding: 10% 2% 10% 15%;
`;
