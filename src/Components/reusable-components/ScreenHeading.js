import React from 'react';
import styled from 'styled-components';

function ScreenHeading(props) {
  const { heading, info, topic } = props;
  return (
    <div>
      <StyledHeadingContainer>
        <div className='heading'>{heading}</div>
        <div className='info'>{info}</div>
        <div className='topic'>{topic}</div>
      </StyledHeadingContainer>
    </div>
  );
}

//Stylin
const StyledHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #374750;
  font-family: Open Sans;
  .heading {
    font-weight: 300;
    font-size: 3rem;
    padding: 10px 0;
    margin-bottom: 15px;
  }
  .info {
    font-weight: 400;
  }
`;

export default ScreenHeading;
