import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
// import { Link } from 'react-router-dom';

class FakeHome extends Component {

  render() {

    return (
      <div>
        <h1>Welcome to the restricted fake homescreen! </h1>
        <button
          onClick={async (e) => {
            e.preventDefault();
            await this.props.firebase.logout();
            this.props.clearFirestore();
          }}
        >
          Logout
    </button>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFirestore: () => dispatch({ type: '@@reduxFirestore/CLEAR_DATA' })
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), firebaseConnect())(FakeHome);