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
background-color: #5c4df2;
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