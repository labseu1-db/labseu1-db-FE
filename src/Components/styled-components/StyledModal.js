import styled from 'styled-components';

export const StyledModalEnvContainer = styled.div`
  width: 40vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-right: 15px;
`;

export const StyledModalContainer = styled.div`
  min-height: 100%;
  width: 100%;
`;

export const StyledModalText = styled.div`
  line-height: 1.6;
  padding: 25px;
  color: black;
`;
export const StyledProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  .active {
    background-color: white;
    border: 1px solid white;
  }
`;

export const StyledProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid white;
  margin: 0 5px;
`;
export const StyledModalH1 = styled.h1`
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-weight: 300;
  color: black;
`;

export const StyledModalCard = styled.div`
  background-color: white;
  margin-top: 50px;
  border-radius: 5px;
`;

export const StyledModalForm = styled.form`
  padding: 25px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  .email-heading {
    padding-bottom: 40px;
  }
`;

export const StyledModalLabel = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 10px;
  color: black;
  .ligther-font {
    font-size: 0.8rem;
    color: lightgray;
  }
`;

export const StyledModalAdder = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #6c48f2;
  padding: 0 25px;
  cursor: pointer;
`;

export const StyledModalInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid lightgray;
  padding: 10px 0;
  margin-bottom: 10px;
  .email-input {
    &::placeholder {
      font-size: 1.2rem;
    }
  }

  &:focus {
    border-bottom: 2px solid #6c48f2;
    outline: none;
  }
`;

export const StyledModalButton = styled.button`
  width: 100px;
  padding: 5px 15px;
  margin: 0 25px 25px 0;
  color: white;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: #6c48f2;
`;

export const SDModalMainButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  .cancel-button {
    color: #6c48f2;
    background-color: white;
    border: 2px solid #6c48f2;
  }
`;

export const StyledActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;
