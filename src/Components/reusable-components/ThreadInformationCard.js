import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Main component
export function ThreadInformationCard(props) {
  const { createdBy, createdAt, info, space } = props;
  let dateInfo = new Date(createdAt);
  let date = `${dateInfo.getMonth()}/${dateInfo.getDate()} ${dateInfo.getHours()}:${('0' + dateInfo.getMinutes()).slice(
    -2
  )}`;
  return (
    <StyledThreadContainer>
      <StyledTopContent>
        <StyledPhotoContainer>
          {/* <img src={img} alt="author" /> */}
          <div className="initials">{createdBy[0].toUpperCase()}</div>
        </StyledPhotoContainer>
        <StyledRightSideOfContainer>
          <StyledAuthorContainer>{createdBy}</StyledAuthorContainer>
          <StyledThreadInformation>
            started this thread in <span className="space">{space.spaceName}</span> · <span>{date}</span>
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
  .initials {
    border-radius: 50%;
    background-color: #ffc206;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    space: state.firestore.ordered.spaces ? state.firestore.ordered.spaces[0] : []
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'spaces',
        doc: props.spaceId
      }
    ];
  })
)(ThreadInformationCard);
