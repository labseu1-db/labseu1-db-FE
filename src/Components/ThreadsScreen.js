import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Import components
import BackToButton from './reusable-components/BackToButton';
import ScreenHeading from './reusable-components/ScreenHeading';
import ThreadInformationCard from './reusable-components/ThreadInformationCard';
import CommentCard from './reusable-components/CommentCard';

//Main component
class ThreadsScreen extends React.Component {
  render() {
    return (
      <div>
        <BackToButton />
        <ScreenHeading heading="Thread" />
        <ThreadInformationCard
          img="https://pbs.twimg.com/profile_images/961263385202561024/H6hygos5.jpg"
          createdBy="Ivana Huckova"
          createdAt="5/8 at 2:57 pm"
          space="Product"
          info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
        />
        <CommentCard
          img="https://pbs.twimg.com/profile_images/961263385202561024/H6hygos5.jpg"
          createdBy="Ivana Huckova"
          createdAt="5/8 at 2:57 pm"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
          likes={20}
          didUserLikeComment={true}
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
