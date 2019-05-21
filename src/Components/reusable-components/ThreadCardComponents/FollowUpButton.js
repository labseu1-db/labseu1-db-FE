import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import styled from 'styled-components';

//Semantic components
import { Icon } from 'semantic-ui-react';

//Main component
export class FollowUpButton extends React.Component {
  markAsFollowUp = e => {
    e.preventDefault();
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
          <StyledFollowUpButton
            className="button1"
            id="toggle"
            value="Follow Up"
            onClick={e => this.markAsFollowUp(e)}
          >
            <Icon.Group className="clipboard" size="large">
              <Icon name="clipboard outline" />
            </Icon.Group>
            Follow Up
          </StyledFollowUpButton>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = {};

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(FollowUpButton);

//Styling
const StyledFollowUpButton = styled.div`
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
  margin-top: 57px;
  margin-right: -18px;
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
