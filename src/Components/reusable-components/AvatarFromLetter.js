import React from 'react';
import styled from 'styled-components';

export default function AvatarFromLetter(props) {
  const style = {
    marginTop: props.marginTop,
    fontSize: props.fontSize,
    width: props.width,
    height: props.height,
    // color: '#374650'
    color: 'white'
  };
  return <StyledImageContainer style={style}>{props.username[0].toUpperCase()}</StyledImageContainer>;
}

const StyledImageContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  /* background-color: #ff934c; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  background-color: #ffc206;
  background-color: #dbc3b6;
  background-color: #fff7f3;
  /* background-color: #e4d0c6; */
  /* background-color: #ffc9ad; */
  /* background-color: #ff8434;
  background-color: #ff706c; */
  background-color: #ffb48f;
`;
