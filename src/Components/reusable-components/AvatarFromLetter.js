import React from 'react';
import styled from 'styled-components';

export default function AvatarFromLetter(props) {
  const style = {
    marginTop: props.marginTop,
    fontSize: props.fontSize,
    width: props.width,
    height: props.height,
    color: 'white'
  };
  return <StyledImageContainer style={style}>{props.username[0].toUpperCase()}</StyledImageContainer>;
}

const StyledImageContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ff934c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  /* background-color: #ffc206; */
  /* background-color: #ff8434; */
  /* background-color: #ff706c; */
`;
