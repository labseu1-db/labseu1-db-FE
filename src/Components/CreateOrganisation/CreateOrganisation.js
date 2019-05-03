import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import { showModal } from '../../redux/actions/actionCreators';

import CreateOrganisationModal from './CreateOrganisationModal';
import InviteYourTeamModal from './InviteYourTeamModal';
import CreateSpacesModal from './CreateSpacesModal';

class CreateOrganisation extends Component {
  render() {
    if (this.props.modal === 'Modal1') {
      return <CreateOrganisationModal shoudlBeOpen={true} showModal={this.props.showModal} />;
    }
    if (this.props.modal === 'Modal2') {
      return <InviteYourTeamModal shoudlBeOpen={true} />;
    }
    if (this.props.modal === 'Modal3') {
      return <CreateSpacesModal shoudlBeOpen={true} />;
    }
    return (
      <button
        onClick={e => {
          e.preventDefault();
          this.props.showModal('Modal1');
        }}>
        Click
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    modal: state.modal.activeModal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal }, dispatch);
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(CreateOrganisation);
