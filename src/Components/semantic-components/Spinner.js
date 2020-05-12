import React from 'react';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';

const Spinner = () => (
  <StyledSpinner>
    <Loader active size="small" />
  </StyledSpinner>
);

export default Spinner;

const StyledSpinner = styled.div`
  height: 10px;
`;
