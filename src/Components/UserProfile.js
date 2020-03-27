import React, { Component } from 'react';
import { showModal } from '../redux/actions/actionCreators';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
import styled from 'styled-components';
import ProfileCard from './reusable-components/ProfileCard';
import { Redirect } from 'react-router-dom';
import Navbar from './NavBar';
import RightSidebar from './RightSidebar';

class UserProfile extends Component {
  render() {
    if (this.props.resetPasswordStatus) {
      return <Redirect to={`/changePassword/${this.props.match.params.id}`} />;
    }
    return (
      <StyledMain>
        <Navbar {...this.props} />
        <StyledMainScreen>
          <ProfileCard />
        </StyledMainScreen>
        <RightSidebar />
      </StyledMain>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    threads: state.firestore.ordered.threads
      ? state.firestore.ordered.threads
      : [],
    space: state.firestore.ordered.spaces
      ? state.firestore.ordered.spaces[0]
      : [],
    spaceId: state.spaceId,
    activeModal: state.modal.activeModal,
    resetPasswordStatus: state.resetPassword
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal }, dispatch);
};

export default compose(
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
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

const StyledMain = styled.div`
  display: flex;
  width: 100vw;
  background-color: #fff7f3;
`;

const StyledMainScreen = styled.div`
  margin-left: 309px;
  background-color: #fff7f3;
  min-height: 100vh;
  padding: 10vh 12%;
  width: 100%;
`;
