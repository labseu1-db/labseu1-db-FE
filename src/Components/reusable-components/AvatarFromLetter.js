import React from 'react';
import styled from 'styled-components';
import Spinner from '../semantic-components/Spinner';

export default function AvatarFromLetter(props) {
  const style = {
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    color: 'white'
  };
  if (props.username === undefined) {
    return <Spinner />;
  }
  return (
    <StyledImageContainer style={style} aria-label="Avatar Letter">
      <div
        className={
          props.username[0].toUpperCase() < 'E'
            ? 'first'
            : props.username[0].toUpperCase() < 'J'
            ? 'second'
            : props.username[0].toUpperCase() < 'O'
            ? 'third'
            : props.username[0].toUpperCase() < 'T'
            ? 'fourth'
            : 'fifth'
        }
      >
        {props.username[0].toUpperCase()}
      </div>
    </StyledImageContainer>
  );
}

const StyledImageContainer = styled.div`
  div {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    /* background-color: #ff934c; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 600;
  }
  .first {
    /* background-color: #ffb48f;
    background-color: #49d1b7; */
    background-color: #27c3a4;
    color: white;
  }
  .second {
    /* background-color: #ffd18f;
    background-color: #5689d4; */
    background-color: #f64e49;
    color: white;
  }

  .third {
    /* background-color: #6284a6;
    background-color: #ffc158; */
    background-color: #ff8333;
    color: white;
  }

  .fourth {
    /* background-color: #60ab90;
    background-color: #ff9a58; */
    background-color: #ffb433;
    color: white;
  }

  .fifth {
    /* background-color: #60ab90;
    background-color: #ff9a58; */
    background-color: #3670c6;
    color: white;
  }
`;
