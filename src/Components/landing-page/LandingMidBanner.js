import React from 'react';
import styled from 'styled-components';

//Import icons/images

//Import components

//Main component
export default class LandingMidBanner extends React.Component {
  render() {
    return (
      <StyledMidBanner aria-label="LandingMidBanner">
        <h1>Better discussions, better decisions.</h1>
        <div>
          We believe, that better discussions bring better decisions. Get your
          team on Pinely today and start moving forward, together.
        </div>
        {/* <div>
          <input placeholder="Enter your email" />
          <button>submit</button>
        </div> */}
      </StyledMidBanner>
    );
  }
}

const StyledMidBanner = styled.div`
  margin: 0 0 3vh 0;
  width: 100%;
  padding: 10vh 15vw;
  background-color: #3670c666;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 1500px) {
    padding: 10vh 10vw;
  }
  h1 {
    font-size: 2.5rem;
    text-align: center;
    @media screen and (max-width: 600px) {
      font-size: 1.7rem;
    }
  }
  div {
    font-size: 1.2rem;
    padding-top: 10px;
    text-align: center;
  }

  input {
    border-radius: 15px;
    border: none;
    margin: 15px 15px 10px 0px;
    padding: 5px 15px;
    min-width: 20%;
    ::placeholder {
      font-size: 0.8rem;
      color: darkgray;
    }
  }

  button {
    padding: 5px 15px;
    background-color: #00bc98;
    color: white;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    &:disabled {
      background-color: lightgray;
    }
  }
`;
