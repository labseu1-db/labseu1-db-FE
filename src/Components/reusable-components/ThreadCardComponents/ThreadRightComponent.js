import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

//Import icons
import clipboardIcon from '../../../images/icon-clipboard-lightgray.svg';

//Main component
export class ThreadRightComponent extends React.Component {
  state = {
    isFollowUpText: 'Follow up'
  };

  markAsFollowUp = e => {
    e.stopPropagation();
    this.setState({ isFollowUpText: 'Marked for followup' });
    let threadRef = this.props.firestore
      .collection('threads')
      .doc(this.props.threadId);
    threadRef.update({
      isFollowUp: true,
      arrayOfUserIdsWhoFollowUp: this.props.firestore.FieldValue.arrayUnion(
        localStorage.getItem('uuid')
      )
    });
  };
  render() {
    return (
      <div>
        {!this.props.isFollowUpDecided && (
          <StyledRightContainer
            value={this.state.isFollowUpText}
            onClick={e => this.markAsFollowUp(e)}
          >
            <StyledFollowUpButton>
              <img src={clipboardIcon} alt="home icon" />
              {this.state.isFollowUpText}
            </StyledFollowUpButton>
          </StyledRightContainer>
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
    border: 1px solid black;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  img {
    width: 1.25rem;
    margin-right: 5px;
  }
`;

//Default export
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
    // comments: state.firestore.ordered.comments ? state.firestore.ordered.comments : []
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
  //   props => {
  //   return [
  //     {
  //       collection: 'comments',
  //       where: [['threadId', '==', props.threadId]]
  //     }
  //   ];
  // }
)(ThreadRightComponent);
