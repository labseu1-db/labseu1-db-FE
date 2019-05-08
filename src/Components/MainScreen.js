import React from 'react';

//Import icons/images
import penIconPurple from '../images/icon-pen-purple.svg';
import penIconWhite from '../images/icon-pen-white.svg';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';
import ScreenButton from './reusable-components/ScreenButton';

export default function MainScreen() {
  return (
    <div>
      <ScreenHeading heading="Home" info="Catch up on the most recent threads." />
      <ScreenButton content="Start a thread" icon={penIconWhite} backgroundColor="#5C4DF2" color="white" />
    </div>
  );
}
