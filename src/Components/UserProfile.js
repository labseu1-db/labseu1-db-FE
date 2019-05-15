import React, { Component } from 'react';
import { showModal } from '../redux/actions/actionCreators';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import styled from 'styled-components';
import ProfileCard from './reusable-components/ProfileCard';

class UserProfile extends Component {
  render() {
    return (
      <StyledMainScreen>
        <ProfileCard />
      </StyledMainScreen>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    threads: state.firestore.ordered.threads ? state.firestore.ordered.threads : [],
    space: state.firestore.ordered.spaces ? state.firestore.ordered.spaces[0] : [],
    spaceId: state.spaceId,
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
        collection: 'threads',
        where: ['spaceId', '==', props.spaceId]
      },
      {
        collection: 'spaces',
        doc: props.spaceId
      }
    ];
  })
)(UserProfile);

const StyledMainScreen = styled.div`
  background-color: #faf9f7;
  min-height: 100vh;
  padding: 8vh 0% 8vh 21%;
`;
