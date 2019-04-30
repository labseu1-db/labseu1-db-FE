// Endpoints for:
// User profile settings

// - [x]  Full name of user
// - [x]  Email
// - [x]  Profile picture
// - [x]  List of organisations
// - [x]  Whether user is admin or not for each org

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class UserProfileEndpoint extends Component {
  generalStyle = {
    lineHeight: 2,
    fontFamily: 'Helvetica'
  };

  boldSpan = {
    fontWeight: 'bold'
  };

  render() {
    const activeUser = this.props.user;
    const notPassingTest = '❌';

    console.log(activeUser);
    return (
      <div style={this.generalStyle}>
        <h2>USER PROFILE SETTINGS</h2>
        <div>
          <span style={this.boldSpan}>Full Name: </span>
          {activeUser.fullName ? <span>{activeUser.fullName}</span> : <span>{notPassingTest}</span>}
        </div>
        <div>
          <span style={this.boldSpan}>Email: </span>
          {activeUser.userEmail ? <span>{activeUser.userEmail}</span> : <span>{notPassingTest}</span>}
        </div>
        <div>
          <span style={this.boldSpan}>Profile picture: </span>
          {activeUser.profileUrl ? <span>{activeUser.profileUrl}</span> : <span>{notPassingTest}</span>}
        </div>
        <div>
          <span style={this.boldSpan}>List of orgs: </span>
          {activeUser.arrayOfOrgs ? (
            activeUser.arrayOfOrgs.map(o => {
              return (
                <ul key={o.orgId}>
                  <li>
                    <div>{o.orgName} </div>
                    <div>admin: {o.isAdmin.toString()} </div>
                  </li>
                </ul>
              );
            })
          ) : (
            <span>{notPassingTest}</span>
          )}
        </div>
      </div>
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
        doc: '035f8964-b26c-4637-9b65-11774027e9f9'
      }
    ];
  })
)(UserProfileEndpoint);
