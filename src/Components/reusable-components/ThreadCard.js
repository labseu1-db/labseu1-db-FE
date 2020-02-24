import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Import components
import ThreadLeftComponentImage from './ThreadCardComponents/ThreadLeftComponentImage';
import ThreadLeftComponentText from './ThreadCardComponents/ThreadLeftComponentText';
import ThreadMiddleComponent from './ThreadCardComponents/ThreadMiddleComponent';
import ThreadRightComponent from './ThreadCardComponents/ThreadRightComponent';

//Main component
function ThreadCard(props) {
  const {
    createdBy,
    createdAt,
    heading,
    info,
    checked,
    threadId,
    onClick,
    currentSpace,
    isFollowUpDecided
  } = props;

  return (
    <div>
      <StyledThreadContainer onClick={onClick}>
        <ThreadLeftComponentImage checked={checked} createdBy={createdBy} />
        <ThreadLeftComponentText
          createdBy={createdBy}
          createdAt={createdAt}
          space={currentSpace}
          checked={checked}
        />
        <ThreadMiddleComponent heading={heading} info={info} />
        <ThreadRightComponent
          isFollowUpDecided={isFollowUpDecided}
          threadId={threadId}
        />
      </StyledThreadContainer>
    </div>
  );
}

//Styling
const StyledThreadContainer = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 160px;
  margin: 25px 0;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
  &:hover {
    border: 1px solid #00bc98b3;
    cursor: pointer;
  }
`;

//Export component wrapped in store + firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeSpace: state.firestore.ordered.spaces
      ? state.firestore.ordered.spaces[0]
      : []
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'spaces',
        doc: `${props.spaceId}`
      }
    ];
  })
)(ThreadCard);
