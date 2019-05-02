import styled from 'styled-components';

export const StyledButton = styled.button`
  font-size: 1.1rem;
  width: 100px;
  padding: 5px 15px;
  background-color: lightgray;
  color: white;
  border-radius: 15px;
  border: none;
  &:hover {
    background-color: #6c48f2;
  }
`;

export const PasswordlessButton = styled.button`
  font-family: 'Open Sans', sans-serif;
  color: black;
  font-size: 0.8rem;
  font-weight: 300;
  margin: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  &:hover {
    color: #6c48f2;
  }
`;
