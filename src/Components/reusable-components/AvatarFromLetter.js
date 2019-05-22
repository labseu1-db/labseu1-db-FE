import React from 'react';
import styled from 'styled-components';

export default function AvatarFromLetter(props) {
  return (
    <StyledImageContainer>
      <div className="initials">{props.username[0].toUpperCase()}</div>
    </StyledImageContainer>
  );
}

const StyledImageContainer = styled.div`
  width: 32px;
  height: 32px;

  .initials {
    border-radius: 50%;
    background-color: #ffc206;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.3rem;
  }
`;
