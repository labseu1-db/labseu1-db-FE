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
    return (
      <div>
        {this.props.activeModal === 'CreateOrganisationModal' && <CreateOrganisationModal shoudlBeOpen={true} showModal={this.props.showModal} activeModal={this.props.activeModal} />}
        {this.props.activeModal === 'InviteYourTeamModal' && <InviteYourTeamModal shoudlBeOpen={true} showModal={this.props.showModal} activeModal={this.props.activeModal} />}
        {this.props.activeModal === 'CreateSpacesModal' && <CreateSpacesModal shoudlBeOpen={true} showModal={this.props.showModal} activeModal={this.props.activeModal} />}
        <button
          onClick={e => {
            e.preventDefault();
            this.props.showModal('CreateOrganisationModal');
          }}>
          Click
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal
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
