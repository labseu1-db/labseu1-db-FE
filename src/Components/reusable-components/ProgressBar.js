import React from 'react';
import styled from 'styled-components';

function ProgressBar(props) {
  const { activeDots, bulletpoints } = props;

  return (
    <div>
      <StyledProgressContainer aria-label="ProgressBar">
        <StyledProgressDot
          className={`${activeDots > 0 && 'active'} ${bulletpoints < 1 &&
            'display-no'}`}
        />
        <StyledProgressDot
          className={`${activeDots > 1 && 'active'} ${bulletpoints < 2 &&
            'display-no'}`}
        />
        <StyledProgressDot
          className={`${activeDots > 2 && 'active'} ${bulletpoints < 3 &&
            'display-no'}`}
        />
        <StyledProgressDot
          className={`${activeDots > 3 && 'active'} ${bulletpoints < 4 &&
            'display-no'}`}
        />
        <StyledProgressDot
          className={`${activeDots > 4 && 'active'} ${bulletpoints < 5 &&
            'display-no'}`}
        />
        <StyledProgressDot
          className={`${activeDots > 5 && 'active'} ${bulletpoints < 6 &&
            'display-no'}`}
        />
        <StyledProgressDot
          className={`${activeDots > 6 && 'active'} ${bulletpoints < 7 &&
            'display-no'}`}
        />
      </StyledProgressContainer>
    </div>
  );
}

//Styling
const StyledProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  .active {
    background-color: white;
    border: 1px solid white;
  }
  .display-no {
    display: none;
  }
`;

const StyledProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid white;
  margin: 0 5px;
`;

export default ProgressBar;
