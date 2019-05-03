import styled from 'styled-components';
import loginAnimation from '../animations/LoginAnimation';

export const StyledLogin = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  padding-top: 50px;

  background-color: #faf9f7;
`;

export const StyledLoginCon = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledForm = styled.form`
  width: 450px;
  padding: 30px 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0px 18px 35px -34px rgba(92, 92, 91, 1);
  -moz-box-shadow: 0px 18px 35px -34px rgba(92, 92, 91, 1);
  box-shadow: 0px 18px 35px -34px rgba(92, 92, 91, 1);
  .one-row {
    flex-direction: row;
  }
`;

export const StyledInput = styled.input`
  width: 70%;
  border: none;
  border-bottom: 2px solid #bdc3c9;
  padding: 5px 0;
  margin-bottom: 10px;
  &:focus {
    border-bottom: 2px solid #6c48f2;
    outline: none;
  }
`;

export const StyledLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;
