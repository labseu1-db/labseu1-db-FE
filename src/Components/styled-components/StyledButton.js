import styled from 'styled-components';

export const StyledButton = styled.button`
  font-size: 1.3rem;
  width: 105px;
  padding: 5px 15px;
  background-color: #00bc98;
  color: white;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: lightgray;
  }
`;

export const ForgotPasswordDiv = styled.div`
  font-family: 'Open Sans', sans-serif;
  padding-left: 124px;
  color: black;
  font-size: 0.8rem;
  font-weight: 300;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: #00bc98;
  }
`;

export const StyledSendEmailButton = styled.button`
  font-size: 1.3rem;
  width: 150px;
  padding: 5px 15px;
  background-color: #00bc98;
  color: white;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: lightgray;
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
    color: #00bc98;
  }
`;

// making a comment
