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

export const StyledModalTextInForm = styled.div`
  line-height: 1.6;
  color: black;
  padding-bottom: 25px;
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
  .heading {
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
    color: #bdc3c9;
  }
`;

export const StyledModalAdder = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #5c4df2;
  padding: 0 25px;
  cursor: pointer;
`;

export const StyledModalInput = styled.input`
  width: 98%;
  border: none;
  border-bottom: 2px solid #bdc3c9;
  padding: 10px 0 5px 0;
  margin-bottom: 10px;
  &::placeholder {
    font-size: 1.2rem;
  }

  &:focus {
    border-bottom: 2px solid #5c4df2;
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
  background-color: #5c4df2;
`;

export const StyledModalMainButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  .cancel-button {
    color: #5c4df2;
    background-color: white;
    border: 2px solid #5c4df2;
  }
`;

export const StyledActionButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
`;

export const StyledModalSpacesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  .eggplant {
    background-color: #403b4f;
  }
  .darkgreen {
    background-color: #2e7c87;
  }
  .violet {
    background-color: #5c44f2;
  }
  .darkolive {
    background-color: #36484e;
  }
  .yellow {
    background-color: #d99e49;
  }
  .red {
    background-color: #f26551;
  }
  .lightblue {
    background-color: #19a9e3;
  }
  .green {
    background-color: #19bd98;
  }
  .borderclass {
    border: 2px solid #5c4df2;
  }
`;

export const StyledSpacesModalCard = styled.div`
  width: 24%;
  color: white;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const CharacterLeft = styled.div`
  width: 2%;
  padding-left: 3px;
  font-size: 0.8rem;
  font-weight: 700;
  color: #bdc3c9;
`;

export const StyledLableContainer = styled.div`
  display: flex;
  align-items: center;
`;
