/*
Sidebar
- [x]  User’s full name
- [x]  Profile picture
- [x]  List of organisation names (middle left dropdown)
- [x]  Space names for the chosen organisation 
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class SidebarEndpoint extends Component {
  render() {
    console.log(this.props.user);
    return (
      <div>
        <h2>Sidebar Endpoint</h2>
        {this.props.user.fullName && <h3>{this.props.user.fullName}</h3>}
        {this.props.user.profileUrl && (
          <img src={this.props.user.profileUrl} alt="profileImage" />
        )}
        {this.props.user.arrayOfOrgs && (
          <div>
            {this.props.user.arrayOfOrgs.map((org, index) => (
              <div key={index}>
                {" "}
                <h4>{org.orgName}</h4>
              </div>
            ))}
          </div>
        )}
        {this.props.user.arrayOfSpaceNames && (
          <div>
            {this.props.user.arrayOfSpaceNames.map((space, index) => (
              <div key={index}>
                {" "}
                <h4>{space.arrayOfSpaceNames}</h4>
              </div>
            ))}
          </div>
        )}
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
        collection: "users",
        doc: "035f8964-b26c-4637-9b65-11774027e9f9"
      }
    ];
  })
)(SidebarEndpoint);
