import React from 'react';
import styled from 'styled-components';

function ThreadCard(props) {
  const { createdBy, createdAt, space, heading, info, numberOfComments, numberOfLikes } = props;
  return (
    <div>
      <StyledThreadContainer>
        <div />
      </StyledThreadContainer>
    </div>
  );
}

//Stylin
const StyledThreadContainer = styled.div`
  background-color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ThreadCard;
