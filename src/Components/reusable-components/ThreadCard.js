import React from 'react';
import styled from 'styled-components';

//Import components
import ThreadLeftComponentImage from './ThreadCardComponents/ThreadLeftComponentImage';
import ThreadLeftComponentText from './ThreadCardComponents/ThreadLeftComponentText';
import ThreadMiddleComponent from './ThreadCardComponents/ThreadMiddleComponent';

function ThreadCard(props) {
  const { createdBy, createdAt, space, heading, info, numberOfComments, numberOfLikes, checked } = props;
  return (
    <div>
      <StyledThreadContainer>
        <ThreadLeftComponentImage checked={checked} createdBy={createdBy} />
        <ThreadLeftComponentText createdBy={createdBy} createdAt={createdAt} space={space} checked={checked} />
        <ThreadMiddleComponent heading={heading} info={info} />
        <ThreadRightContainer />
      </StyledThreadContainer>
    </div>
  );
}

//Stylin
const StyledThreadContainer = styled.div`
  background-color: white;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 150px;
`;

const ThreadRightContainer = styled.div`
  width: 5%;
  height: 100%;
  background: blue;
`;
export default ThreadCard;
