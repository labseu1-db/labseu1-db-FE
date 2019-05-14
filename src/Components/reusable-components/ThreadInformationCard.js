import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Main component
export default function ThreadInformationCard(props) {
  const { createdBy, createdAt, info, photo } = props;
  return (
    <StyledThreadContainer>
      <StyledTopContent>
        <StyledPhotoContainer />
        <StyledRightSideOfContainer>
          <StyledAuthorContainer />
          <StyledThreadInformation />
        </StyledRightSideOfContainer>
      </StyledTopContent>
      <StyledBottomContent />
    </StyledThreadContainer>
  );
}

//Styling
const StyledThreadContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 30px;
  background-color: white;
  border: 1px solid black;
`;

const StyledTopContent = styled.div``;
const StyledPhotoContainer = styled.div``;
const StyledRightSideOfContainer = styled.div``;
const StyledAuthorContainer = styled.div``;
const StyledThreadInformation = styled.div``;
const StyledBottomContent = styled.div``;
