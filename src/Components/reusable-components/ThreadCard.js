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
import FollowUpButton from './ThreadCardComponents/FollowUpButton';

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

  const stopPropagation = e => {
    e.stopPropagation();
  };

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
        <StyledFollowUp>
          {isFollowUpDecided && (
            <StyledDecision onClick={stopPropagation}>
              Marked for followup
            </StyledDecision>
          )}
          {
            <FollowUpButton
              isFollowUpDecided={isFollowUpDecided}
              threadId={threadId}
            />
          }
        </StyledFollowUp>
        <ThreadRightComponent threadId={threadId} />
      </StyledThreadContainer>
    </div>
  );
}

//Styling
const StyledFollowUp = styled.div`
  height: 100%;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    border: 1px solid #5c4df2b3;
    cursor: pointer;
  }
`;

const StyledDecision = styled.div`
  background-color: white;
  color: black;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  border-radius: 100px;
  border: 2px solid #e7e7e7;
  font-size: 11px;
  line-height: normal;
  margin-right: 49px;
  padding-left: 9px;
  padding-right: 9px;
  text-align: center;
  border-radius: 10px;
  white-space: nowrap;
  &:hover {
    border: 1px solid black;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'spaces',
        doc: `${props.spaceId}`
      }
    ];
  })
)(ThreadCard);
