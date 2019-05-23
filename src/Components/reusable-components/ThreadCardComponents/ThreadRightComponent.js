import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
//Import icons
import clipboardIcon from '../../../images/icon-clipboard-green.svg';

//Main component
export class ThreadRightComponent extends React.Component {
  markAsFollowUp = e => {
    e.stopPropagation();

    let threadRef = this.props.firestore.collection('threads').doc(this.props.threadId);
    if (this.props.isFollowUpDecided) {
      threadRef.update({
        arrayOfUserIdsWhoFollowUp: this.props.firestore.FieldValue.arrayRemove(localStorage.getItem('uuid'))
      });
    } else {
      threadRef.update({
        isFollowUp: true,
        arrayOfUserIdsWhoFollowUp: this.props.firestore.FieldValue.arrayUnion(localStorage.getItem('uuid'))
      });
    }
  };

  render() {
    return (
      <div>
        {!this.props.isFollowUpDecided && (
          <StyledRightContainer onClick={e => this.markAsFollowUp(e)}>
            <StyledFollowUpButton>Follow Up</StyledFollowUpButton>
          </StyledRightContainer>
        )}
        {this.props.isFollowUpDecided && (
          <StyledDecision onClick={e => this.markAsFollowUp(e)}>
            <img src={clipboardIcon} alt="home icon" />
            Following
          </StyledDecision>
        )}
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
  color: #bdc3c9;
  font-size: 13px;
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
  height: 30px;
  text-align: center;
  border: none;
  border-radius: 15px;
  white-space: nowrap;
  position: relative;
  display: flex;
  &:hover {
    /* border: 1px solid #00bc98; */
    font-weight: 600;
    cursor: pointer;
  }
  img {
    width: 1.25rem;
    margin-right: 5px;
  }
`;

const StyledDecision = styled.button`
  background-color: white;
  color: #00bc98;
  font-size: 13px;
  font-family: 'Open Sans', Helvetica, Arial, 'sans-serif';
  height: 30px;
  text-align: center;
  border: none;
  border-radius: 15px;
  white-space: nowrap;
  position: relative;
  display: flex;
  img {
    width: 1.25rem;
    margin-right: 5px;
  }
  &:hover {
    /* border: 1px solid #00bc98b3; */
    font-weight: 600;
    cursor: pointer;
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
