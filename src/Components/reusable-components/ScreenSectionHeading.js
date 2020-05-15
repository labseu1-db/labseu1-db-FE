import React from 'react';
import styled from 'styled-components';

function ScreenSectionHeading(props) {
  const { heading } = props;
  return (
    <div>
      <StyledHeadingContainer aria-label="Screen Section Heading">
        <div>{heading}</div>
      </StyledHeadingContainer>
    </div>
  );
}

//Stylin
const StyledHeadingContainer = styled.div`
  color: #374750;
  font-family: Open Sans;
  font-weight: 700;
  font-size: 1rem;
`;

export default ScreenSectionHeading;
