import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

//Import components
import ScreenHeading from './reusable-components/ScreenHeading';

import { showModal } from '../redux/actions/actionCreators';

//Main component
class FollowUp extends React.Component {
  render() {
    return (
      <StyledFollowUp>
        <StyledFirstRow>
          <ScreenHeading
            heading="Follow Up"
            info="Get back to the things you've marked as follow up."
          />
        </StyledFirstRow>
      </StyledFollowUp>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal }, dispatch);
};

export default compose(
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'spaces'
      }
    ];
  })
)(FollowUp);

//Styling
const StyledFollowUp = styled.div`
  background-color: #faf9f7;
  min-height: 100vh;
  padding: 10vh 5%;
`;

const StyledFirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5vh;
`;
