import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;

export const StyledButtonCancel = styled.button`
  margin-top: 50px;
  margin-left: 253px;
  margin-right: 12px;
  padding: 5px 15px;
  color: #5c4df2;
  border-radius: 15px;
  background-color: white;
  border-color: #5c4df2;
`;

export const StyledButtonCreateSpace = styled.button`
  padding: 5px 15px;
  color: white;
  border-radius: 15px;
  background-color: lightgray;
  &:focus {
    background-color: #5c4df2;
  }
`;

export const StyledInput = styled.input`
  width: 470px;
  font-size: 19px;
  border: none;
  border-bottom: 2px solid lightgray;
  padding: 5px 0;
  margin-bottom: 10px;
  &:focus {
    border-bottom: 2px solid #6c48f2;
    outline: none;
  }
`;

export const StyledMainHeader = styled.div`
  font-size: 24px;
  color: rgb(55, 71, 80);
  font-family: "Open Sans";
  padding-bottom: 30px;
`;

export const StyledOptional = styled.div`
  font-size: 14px;
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
  line-height: 1.82;
  color: rgba(38, 46, 51, 0.5);
  margin-left: 257px;
  margin-top: -24px;
`;
