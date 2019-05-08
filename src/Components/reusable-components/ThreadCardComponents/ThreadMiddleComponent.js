import React from 'react';
import styled from 'styled-components';

function ThreadMiddleComponent(props) {
  const { heading, info } = props;
  const shorterInfo = info.substr(0, 175);
  return (
    <StyledMiddleContainer>
      <div className="thread-heading">{heading}</div>
      {info.length < 170 ? <div className="info">{info}</div> : <div className="info">{shorterInfo}...</div>}
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
    line-height: 2;
  }
`;

export default ThreadMiddleComponent;
