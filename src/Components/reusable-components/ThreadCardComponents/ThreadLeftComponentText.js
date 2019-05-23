import React from 'react';
import styled from 'styled-components';

//Main component
function ThreadLeftComponentText(props) {
  const { createdBy, createdAt, space, checked } = props;
  return (
    <StyledLeftContainer>
      <div className="top">
        <div className="bold">{createdBy} started a thread</div>
        <div className="lighter-color">
          {createdAt} {space}
        </div>
      </div>
      <div className="middle"> </div>
      <div className="bottom lighter-color">
        {checked === 'true' && <div>You're all caught up</div>}
        {checked === 'false' && <div>You're not caught up</div>}
      </div>
    </StyledLeftContainer>
  );
}

//Styling
const StyledLeftContainer = styled.div`
  width: 20%;
  padding-left: 4%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  .lighter-color {
    opacity: 0.8;
  }
  .top {
    color: #374750;
    font-size: 0.7rem;
    line-height: 1.5;
    .bold {
      font-weight: bold;
    }
    height: 20%;
  }
  .middle {
    height: 60px;
  }

  .bottom {
    color: #374750;
    font-size: 0.7rem;
    font-weight: 300;
    height: 15%;
  }
`;

//Default export
export default ThreadLeftComponentText;
