import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import CreateOrganisationModal from './CreateOrganisationModal';
import InviteYourTeamModal from './InviteYourTeamModal';
import CreateSpacesModal from './CreateSpacesModal';

class CreateOrganisation extends Component {
  state = { whichModalShouldBeOpened: '' };

  render() {
    if (this.props.modal === 'Modal1') {
      return <CreateOrganisationModal shoudlBeOpen={true} changeModal={this.changeModal} />;
    }
    if (this.props.modal === 'Modal2') {
      return <InviteYourTeamModal shoudlBeOpen={true} />;
    }
    if (this.state.whichModalShouldBeOpened === 'Modal3') {
      return <CreateSpacesModal shoudlBeOpen={true} />;
    }
    return (
      <button
        onClick={() => {
          this.setState({ whichModalShouldBeOpened: 'Modal1' });
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
    modal: state.modal
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firebaseConnect()
)(CreateOrganisation);
