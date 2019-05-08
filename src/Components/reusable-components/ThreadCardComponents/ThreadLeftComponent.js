import React from 'react';
import styled from 'styled-components';

function ThreadLeftComponent(props) {
  const { createdBy, createdAt, space, checked } = props;
  return (
    <StyledLeftContainer>
      <div className="top">
        <div className="bold">{createdBy} started a thread</div>
        <div>
          {createdAt} in {space}
        </div>
      </div>
      <div className="middle"> </div>
      <div className="bottom">
        {checked === 'true' && <div>You're all caught up</div>}
        {checked === 'false' && <div>You're not caught up</div>}
      </div>
    </StyledLeftContainer>
  );
}

//Styling
const StyledLeftContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid black;
  height: 100%;
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
    min-height: 60%;
  }

  .bottom {
    color: #374750;
    font-size: 0.7rem;
    font-weight: 300;
    height: 15%;
  }
`;

export default ThreadLeftComponent;
