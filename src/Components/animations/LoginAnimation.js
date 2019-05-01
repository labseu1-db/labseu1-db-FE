import React from 'react';
import styled from 'styled-components';
import backgroundImg from '../../images/login-background.svg';

export default function loginAnimation() {
  return (
    <SDContainer>
      <div />
    </SDContainer>
  );
}

const SDContainer = styled.div`
  width: 100%;
  height: 30vh;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  div {
    background: url(${backgroundImg}) repeat-x 0 / 100% auto;
    height: 100%;
    animation: ani 20s linear infinite;
  }

  @keyframes ani {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100vw 0;
    }
  }
`;
