import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import NavBar from './NavBar';
import styled from 'styled-components';

import Spinner from './semantic-components/Spinner';
import RightSidebar from './RightSidebar';
import MainScreen from './MainScreen';

import { showModal } from '../redux/actions/actionCreators';

//Import modals
import CreateOrganisationModal from './Modals/CreateOrganisationModal';

class FakeHome extends Component {
  componentWillUpdate() {
    if (isEmpty(this.props.auth)) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('arrayOfOrgs')) === null) {
      this.props.showModal('CreateOrganisationModal');
      console.log('bla');
    }
  }

  render() {
    // return (
    //   <div>
    //     {this.props.activeModal === 'CreateOrganisationModal' && (
    //       <CreateOrganisationModal
    //         shoudlBeOpen={true}
    //         showModal={this.props.showModal}
    //         activeModal={this.props.activeModal}
    //         addOrgName={this.addOrgName}
    //       />
    //     )}
    //   </div>
    // );
    console.log(this.props.showModal());
    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    return (
      <StyledHomeScreen>
        <FirstDiv>
          <NavBar />
        </FirstDiv>
        <MidRightContainer>
          <SecondDiv>
            <MainScreen />
          </SecondDiv>
          <ThirdDiv>
            <RightSidebar />
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
    activeModal: state.modal.activeModal
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
`;

const ThirdDiv = styled.div`
  width: 30%;
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
