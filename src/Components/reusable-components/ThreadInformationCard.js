import React from 'react';
import styled from 'styled-components';

//Main component
export default function ThreadInformationCard(props) {
  const { createdBy, createdAt, info, img, space } = props;
  return (
    <StyledThreadContainer>
      <StyledTopContent>
        <StyledPhotoContainer>
          <img src={img} alt="author" />
        </StyledPhotoContainer>
        <StyledRightSideOfContainer>
          <StyledAuthorContainer>{createdBy}</StyledAuthorContainer>
          <StyledThreadInformation>
            started this thread in <span className="space">{space}</span> · <span>{createdAt}</span>
          </StyledThreadInformation>
        </StyledRightSideOfContainer>
      </StyledTopContent>
      <StyledBottomContent>{info}</StyledBottomContent>
    </StyledThreadContainer>
  );
}

//Styling
const StyledThreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 24px 0px;
`;

const StyledTopContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const StyledPhotoContainer = styled.div`
  width: 50px;
  height: 50px;
  img {
    max-width: 100%;
    border-radius: 50%;
  }
`;
const StyledRightSideOfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 30px;
  font-weight: 300;
`;
const StyledAuthorContainer = styled.div`
  font-weight: 300;
  font-size: 1.6rem;
`;

const StyledThreadInformation = styled.div`
  color: #879195;
  line-height: 2;
  font-size: 0.9rem;
  .space {
    color: #3d4856;
    font-weight: 600;
  }
`;
const StyledBottomContent = styled.div`
  margin-top: 40px;
  line-height: 1.75;
`;
