import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
//Import icons
import clipboardIcon from '../../../images/icon-clipboard-lightgray.svg';

//Main component
export class ThreadRightComponent extends React.Component {
  markAsFollowUp = e => {
    e.stopPropagation();

    let threadRef = this.props.firestore.collection('threads').doc(this.props.threadId);
    threadRef.update({
      isFollowUp: true,
      arrayOfUserIdsWhoFollowUp: this.props.firestore.FieldValue.arrayUnion(localStorage.getItem('uuid'))
    });
  };

  render() {
    const stopPropagation = e => {
      e.stopPropagation();
    };
    return (
      <div>
        {!this.props.isFollowUpDecided && (
          <StyledRightContainer value={'Follow up'} onClick={e => this.markAsFollowUp(e)}>
            <StyledFollowUpButton>
              <img src={clipboardIcon} alt="home icon" />
              {this.state.isFollowUpText}
            </StyledFollowUpButton>
          </StyledRightContainer>
        )}
        {this.props.isFollowUpDecided && <StyledDecision onClick={stopPropagation}>Marked for followup</StyledDecision>}
      </div>
    );
  }
}

//Styling
const StyledRightContainer = styled.div`
  width: 5%;
  height: 100%;

  .row-with-image {
    display: flex;
    align-items: center;

    font-size: 0.9rem;
    img {
      padding-top: 2px;
      width: 40%;
      margin-right: 5px;
    }
  }
`;

const StyledFollowUpButton = styled.button`
  background-color: white;
  color: #9c9c9c;
  font-size: 13px;
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
  height: 30px;
  text-align: center;
  border-radius: 15px;
  white-space: nowrap;
  position: relative;
  display: flex;
  &:hover {
    border: 1px solid #00bc98b3;
    cursor: pointer;
  }
  img {
    width: 1.25rem;
    margin-right: 5px;
  }
`;

const StyledDecision = styled.button`
  background-color: white;
  color: #9c9c9c;
  font-size: 13px;
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
  height: 30px;
  text-align: center;
  border-radius: 15px;
  white-space: nowrap;
  position: relative;
  display: flex;
  &:hover {
    border: 1px solid #00bc98b3;
  }
`;

//Default export
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile

    // followupArray: state.followUpText
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(ThreadRightComponent);
