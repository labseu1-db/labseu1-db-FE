import React from 'react';
import styled from 'styled-components';

function ThreadMiddleComponent(props) {
  const { heading, info } = props;
  return (
    <StyledMiddleContainer>
      <div className="thread-heading">{heading}</div>
      <div className="info">{info}</div>
    </StyledMiddleContainer>
  );
}

//Styling
const StyledMiddleContainer = styled.div`
  width: 65%;
  height: 100%;
  .thread-heading {
    font-size: 1.4rem;
    font-weight: 300;
    margin: 5px 0 20px 0;
  }
  .info {
    font-size: 1rem;
  }
`;

export default ThreadMiddleComponent;
