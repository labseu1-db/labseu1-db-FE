// Endpoints for: User profile settings
// - [x]  Full name of user
// - [x]  Email
// - [x]  Profile picture
// - [x]  List of organisations
// - [x]  Whether user is admin or not for each org

// - [ ] User Password - NOT NEEDED

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import styled from 'styled-components';

//Doc uuid() variable for user
const userDoc = '035f8964-b26c-4637-9b65-11774027e9f9';

class UserProfileEndpoint extends Component {
  render() {
    const activeUser = this.props.user;
    const ok = '✅';

    return (
      <SDCard>
        <h2>User Profile Endpoint</h2>
        <div>
          <SDSpan>Full Name: </SDSpan>
          {activeUser.fullName && (
            <span>
              {ok} {activeUser.fullName}
            </span>
          )}
        </div>
        <div>
          <SDSpan>Email: </SDSpan>
          {activeUser.userEmail && (
            <span>
              {ok} {activeUser.userEmail}
            </span>
          )}
        </div>
        <div>
          <SDSpan>Profile picture: </SDSpan>
          {activeUser.profileUrl && (
            <span>
              {ok} {activeUser.profileUrl}
            </span>
          )}
        </div>
        <div>
          <SDSpan>List of organisations: </SDSpan>
          {activeUser.arrayOfOrgs &&
            activeUser.arrayOfOrgs.map(o => {
              return (
                <div key={o.orgId}>
                  <div>
                    <SDSpan>Name: </SDSpan>
                    <span>
                      {ok} {o.orgName}{' '}
                    </span>
                  </div>
                  <div>
                    <SDSpan>Admin: </SDSpan>
                    <span>
                      {ok} {o.isAdmin.toString()}{' '}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </SDCard>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.firestore.ordered.users ? state.firestore.ordered.users[0] : []
  };
};

//We are not dispatching anything => mapDispatchToProps is empty
const mapDispatchToProps = {};

//Connect to Firestore
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'users',
        doc: `${userDoc}`
      }
    ];
  })
)(UserProfileEndpoint);

//Styling
const SDCard = styled.div`
  line-height: 2;
  font-family: 'Helvetica';
  margin: 10px;
  padding: 10px;
  background-color: #eaeef7;
  width: 30%;
`;

const SDSpan = styled.span`
  font-weight: bold;
`;
