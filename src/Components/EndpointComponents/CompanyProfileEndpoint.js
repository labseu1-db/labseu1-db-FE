/*
Company profile settings

- [ ]  Company name
- [ ]  Company description
- [ ]  Logo
- [ ]  User list
- [ ]  Admin list
- [ ]  If each employee is admin or not
- [ ]  Subscription type
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class CompanyProfileEndpoint extends Component {
  render() {
    return (
      <div>
        <h2>Company Profile Endpoint</h2>
        {this.props.ARRAY_OF_ITEMS_FROM_DATABASE.map(ITEM => {
          return <div key={ITEM.ID}>{ITEM}</div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ARRAY_OF_ITEMS_FROM_DATABASE: state.firestore.ordered.COLLECTION ? state.firestore.ordered.COLLECTION.map(c => c.COLLECTION_ITEM) : []
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
        collection: 'COLLECTION'
      }
    ];
  })
)(CompanyProfileEndpoint);
