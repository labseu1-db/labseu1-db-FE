import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledH1 = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
`;

export const StyledLink = styled(Link)`
  font-family: 'Open Sans', sans-serif;
  color: black;
  font-size: 0.8rem;
  font-weight: 300;
  &:hover {
    color: #6c48f2;
  }
`;

export const StyledPLabel = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  padding-top: 5px;
`;
