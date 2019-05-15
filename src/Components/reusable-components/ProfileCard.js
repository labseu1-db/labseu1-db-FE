import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ProfileCardUserRow from './ProfileCardComponents/ProfileCardUserRow';
import ProfileCardOrgsField from './ProfileCardComponents/ProfileCardOrgsField';

function ProfileCard(props) {
  return (
    <StyledProfileContainer>
      <ProfileCardUserRow user={props.user} />
      <ProfileCardOrgsField orgs={props.orgs} user={props.user} />
    </StyledProfileContainer>
  );
}

const StyledProfileContainer = styled.div`
  background-color: white;
  padding: 20px;
  height: 100%;
  max-width: 855px;
  min-width: 625px;
  margin: 25px 0;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    user: state.firestore.ordered.filteredUser ? state.firestore.ordered.filteredUser[0] : '',
    orgs: state.firestore.ordered.orgs ? state.firestore.ordered.orgs : ''
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'users',
        doc: `${props.uuid}`
      },
      {
        collection: 'organisations',
        where: ['arrayOfUsersIds', '==', props.uuid],
        storeAs: 'orgs'
      }
    ];
  })
)(ProfileCard);
