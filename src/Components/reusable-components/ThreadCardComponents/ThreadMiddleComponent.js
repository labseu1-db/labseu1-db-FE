import React from 'react';
import styled from 'styled-components';

//Main component
function ThreadMiddleComponent(props) {
  const { heading, info } = props;
  const shorterInfo = info.substr(0, 175);
  return (
    <StyledMiddleContainer>
      <div className="thread-heading">{heading}</div>
      {/* If lenght of info is longer than 175 characters, make it shorter and add ...*/}
      {info.length < 170 ? (
        <div className="info">{info}</div>
      ) : (
        <div className="info">{shorterInfo}...</div>
      )}
    </StyledMiddleContainer>
  );
}

//Styling
const StyledMiddleContainer = styled.div`
  width: 65%;
  padding-left: 4%;
  height: 100%;
  .thread-heading {
    font-size: 1.4rem;
    font-weight: 300;
    margin: 5px 0 20px 0;
  }
  .info {
    font-size: 1rem;
    line-height: 1.8;
  }
`;

//Default export
export default ThreadMiddleComponent;
