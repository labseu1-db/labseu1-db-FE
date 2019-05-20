import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import NavBar from './NavBar';
import styled from 'styled-components';

import Spinner from './semantic-components/Spinner';
import RightSidebar from './RightSidebar';
import MainScreen from './MainScreen';
import SpaceThreads from './SpaceThreads';
import ThreadsScreen from './ThreadsScreen';

import { showModal } from '../redux/actions/actionCreators';
import UserProfile from './UserProfile';
import FollowUp from './FollowUp';

class FakeHome extends Component {
  componentWillUpdate() {
    if (isEmpty(this.props.auth)) {
      this.props.history.push('/login');
    }
  }

  render() {
    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    return (
      <StyledHomeScreen>
        <FirstDiv>
          <NavBar props={this.props} />
        </FirstDiv>
        <MidRightContainer>
          <SecondDiv>
            {this.props.spaceId && !this.props.threadId && <SpaceThreads />}
            {!this.props.spaceId &&
              !this.props.threadId &&
              !this.props.followUpStatus &&
              !this.props.profileRenderStatus && <MainScreen />}
            {this.props.threadId && <ThreadsScreen threadId={this.props.threadId} />}
            {this.props.followUpStatus && <FollowUp />}
            {this.props.profileRenderStatus && <UserProfile {...this.props} />}
          </SecondDiv>
          <ThirdDiv>
            {this.props.followUpStatus && null}
            {!this.props.followUpStatus && <RightSidebar />}
          </ThirdDiv>
        </MidRightContainer>
      </StyledHomeScreen>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    spaceId: state.spaceId,
    threadId: state.threadId,
    followUpStatus: state.followUpStatus,
    profileRenderStatus: state.profileRenderStatus
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' }),
      showModal
    },
    dispatch
  );
};

const StyledHomeScreen = styled.div`
  display: flex;
`;
const FirstDiv = styled.div`
  width: 309px;
  position: fixed;
  left: 0;
  top: 0;
`;

const SecondDiv = styled.div`
  width: 70%;
  margin-left: 309px;
  background-color: #faf9f7;
`;

const ThirdDiv = styled.div`
  width: 30%;
  background-color: #faf9f7;
`;

const MidRightContainer = styled.div`
  width: 100vw;
  display: flex;
`;

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(FakeHome);
