import React from 'react';
import styled from 'styled-components';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';

//Main component
class FollowUp extends React.Component {
  render() {
    return (
      <StyledFollowUp>
        <StyledFirstRow>
          <ScreenHeading
            heading="Follow Up"
            info="Get back to the things you've marked as follow up."
          />
        </StyledFirstRow>
      </StyledFollowUp>
    );
  }
}

//Styling
const StyledFollowUp = styled.div`
  background-color: #faf9f7;
  min-height: 100vh;
  padding: 10vh 5%;
`;

const StyledFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5vh;
`;
