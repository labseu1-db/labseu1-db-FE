import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ProfileCardUserRow from './ProfileCardComponents/ProfileCardUserRow';
import ProfileCardOrgsField from './ProfileCardComponents/ProfileCardOrgsField';
import {
  resetPassword,
  resetPasswordDone,
  editingProfile,
  editingProfileDone
} from '../../redux/actions/actionCreators';

export function ProfileCard(props) {
  return (
    <StyledProfileContainer aria-label="Profile Card">
      <ProfileCardUserRow
        user={props.user}
        onClick={props.resetPassword}
        secondOnClick={props.editingProfile}
        editingProfileStatus={props.editingProfileStatus}
        editingProfileDone={props.editingProfileDone}
        uuid={props.uuid}
      />
      <ProfileCardOrgsField orgs={props.orgs} user={props.user} />
    </StyledProfileContainer>
  );
}

const StyledProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4vh 3vh 3vh 3vh;
  margin-bottom: 4vh;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 10px -8px rgba(0, 0, 0, 1);
`;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    user: state.firestore.ordered.filteredUser
      ? state.firestore.ordered.filteredUser[0]
      : '',
    orgs: state.firestore.ordered.orgs ? state.firestore.ordered.orgs : '',
    editingProfileStatus: state.editingProfileStatus
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      resetPassword,
      resetPasswordDone,
      editingProfile,
      editingProfileDone
    },
    dispatch
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'users',
        doc: `${props.uuid}`
      },
      {
        collection: 'organisations',
        where: ['arrayOfUsersIds', 'array-contains', props.uuid],
        storeAs: 'orgs'
      }
    ];
  })
)(ProfileCard);
