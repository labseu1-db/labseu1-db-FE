import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import components
import BackToButton from './reusable-components/BackToButton';

//Import icons
import arrowIcon from '../images/icon-arrow-left-white.svg';

//Main component
class ThreadsScreen extends React.Component {
  render() {
    return (
      <div>
        <BackToButton
          backgroundColor="white"
          border="1px solid #BDC3C9"
          content="Back to space"
          icon={arrowIcon}
          color="#3D4856"
        />
      </div>
    );
  }
}

//Styling

//Export component wrapped in store + firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    threads: state.firestore.ordered.threads ? state.firestore.ordered.threads : [],
    activeOrg: localStorage.getItem('activeOrg') ? localStorage.getItem('activeOrg') : '',
    activeModal: state.modal.activeModal
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(ThreadsScreen);
