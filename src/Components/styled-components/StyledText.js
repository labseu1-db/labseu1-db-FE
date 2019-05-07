import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledH1 = styled.h1`
	font-family: 'Open Sans', sans-serif;
	font-weight: 300;
	color: var(--dgray-color);
`;

export const StyledLink = styled(Link)`
  font-family: 'Open Sans', sans-serif;
  color: var(--dgray-color);
  font-size: 0.9rem;
  font-weight: 300;
  &:hover {
    color: var(--main-color);
  }
`;

export const StyledPLabel = styled.p`
	font-family: 'Open Sans', sans-serif;
	color: var(--dgray-color);
	font-size: 0.9rem;
	font-weight: 700;
	padding-top: 5px;
`;
