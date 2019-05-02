import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ThreadSpace extends Component {
  render() {
    const activeSpace = this.props.space;
    return <span>{activeSpace.spaceName && <span>{activeSpace.spaceName}</span>}</span>;
  }
}

const mapStateToProps = state => {
  return {
    space: state.firestore.ordered.spaces ? state.firestore.ordered.spaces[0] : []
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
    if (!props.activeSpaceId) return [];
    return [
      {
        collection: 'spaces',
        doc: props.activeSpaceId
      }
    ];
  })
)(ThreadSpace);
