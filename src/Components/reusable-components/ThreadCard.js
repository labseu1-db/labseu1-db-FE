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
import FollowUpDropdown from './ThreadCardComponents/FollowUpDropdown';

//Main component
export class ThreadCard extends React.Component {
  state = {
    isHovering: false
  };

  setIsHovering = boolean => {
    this.setState({
      isHovering: boolean
    });
  };

  render(){
  const { createdBy, createdAt, heading, info, checked, threadId, onClick, currentSpace, isFollowUpDecided } = this.props;
  return (
    <div>
      <StyledThreadContainer onClick={onClick}>
        <ThreadLeftComponentImage checked={checked} createdBy={createdBy} />
        <ThreadLeftComponentText createdBy={createdBy} createdAt={createdAt} space={currentSpace} checked={checked} />
        <ThreadMiddleComponent heading={heading} info={info} />
        <StyledFollowUpContainer
            className={`${isFollowUpDecided && 'paddingTop'}`}
            onMouseEnter={() => this.setIsHovering(true)}
            onMouseLeave={() => this.setIsHovering(false)}
          >
            {isFollowUpDecided && ( <StyledDecision>Marked for followup</StyledDecision> )}
            {this.state.isHovering && (  <FollowUpDropdown isFollowUpDecided={isFollowUpDecided} threadId={threadId} />
            )}
          </StyledFollowUpContainer>
        <ThreadRightComponent threadId={threadId} />
      </StyledThreadContainer>
    </div>
    );
  }
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
    border: 1px solid #5c4df2b3;
    cursor: pointer;
  }
`;

const StyledFollowUpContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 12px 0px;
  background-color: white;
  padding: 10px;
  width: 3%;
  margin-top: 2px;
  margin-right: -80px;
  .ui.dropdown {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 20px;
    height: 10px;
    cursor: pointer;
  }
`;

const StyledDecision = styled.div`
  height: 78px;
  padding: 12px;
  position: absolute;
  background-color: #fff6dd;
  border-radius: 10px 10px 0 0;
  top: 27px;
  right: 2px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-weight: 600;
  font-size: 0.9rem;
`;


//Export component wrapped in store + firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeSpace: state.firestore.ordered.spaces ? state.firestore.ordered.spaces[0] : []
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
