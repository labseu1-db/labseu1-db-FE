import React from 'react';
import styled from 'styled-components';

//Import components
import ThreadImageContainer from './ThreadCardComponents/ThreadImageComponent';
import ThreadLeftContainer from './ThreadCardComponents/ThreadLeftComponent';

function ThreadCard(props) {
  const { createdBy, createdAt, space, heading, info, numberOfComments, numberOfLikes, checked } = props;
  return (
    <div>
      <StyledThreadContainer>
        <ThreadImageContainer checked={checked} createdBy={createdBy} />
        <ThreadLeftContainer createdBy={createdBy} createdAt={createdAt} space={space} checked={checked} />
        <ThreadMiddleContainer />
        <ThreadRightContainer />
      </StyledThreadContainer>
    </div>
  );
}

//Stylin
const StyledThreadContainer = styled.div`
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 150px;
`;

const ThreadMiddleContainer = styled.div`
  width: 60%;
`;

const ThreadRightContainer = styled.div`
  width: 10%;
`;
export default ThreadCard;
