import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import uuid from 'uuid';

import { showModal } from '../../redux/actions/actionCreators';

import CreateOrganisationModal from './CreateOrganisationModal';
import InviteYourTeamModal from './InviteYourTeamModal';
import CreateSpacesModal from './CreateSpacesModal';

class CreateOrganisation extends Component {
  state = {
    orgName: null,
    teamEmailAddress: ['', '', '', ''],
    createdSpaces: []
  };

  addOrgName = name => {
    this.setState({ orgName: name });
  };

  addTeamEmailAddress = emails => {
    this.setState({ teamEmailAddress: emails });
  };

  addCreatedSpaces = spaces => {
    this.setState({ createdSpaces: spaces });
  };

  orgId = uuid();
  addCompanyToDatabase() {
    this.props.firestore.set(
      { collection: 'companiesTEST', doc: this.orgId },
      {
        orgName: this.state.orgName,
        // createdByUserId: _NEEDS_TO_BE_FILLED)WITH ID OF LOGGED IN USER,
        isPremium: false,
        arrayOfUsers: this.state.teamEmailAddress.filter(Boolean).map(e => {
          return { userEmail: e };
        })
        //arrayOfAdmins: _NEEDS_TO_BE_FILLED)WITH ID OF LOGGED IN USER,
      }
    );
  }

  addSpacesToCompanies() {
    this.state.createdSpaces.filter(Boolean).map(space => {
      this.props.firestore.set(
        { collection: 'companiesTEST', doc: uuid() },
        {
          orgId: this.orgId,
          // spaceCreatedByUserId:  _NEEDS_TO_BE_FILLED)WITH ID OF LOGGED IN USER,
          spaceName: space
        }
      );
    });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.addCompanyToDatabase();
            this.addSpacesToCompanies();
          }}>
          Submit
        </button>
        {this.props.activeModal === 'CreateOrganisationModal' && (
          <CreateOrganisationModal shoudlBeOpen={true} showModal={this.props.showModal} activeModal={this.props.activeModal} addOrgName={this.addOrgName} />
        )}
        {this.props.activeModal === 'InviteYourTeamModal' && (
          <InviteYourTeamModal
            shoudlBeOpen={true}
            showModal={this.props.showModal}
            activeModal={this.props.activeModal}
            addTeamEmailAddress={this.addTeamEmailAddress}
            teamEmailAddress={this.state.teamEmailAddress}
          />
        )}
        {this.props.activeModal === 'CreateSpacesModal' && (
          <CreateSpacesModal
            shoudlBeOpen={true}
            showModal={this.props.showModal}
            activeModal={this.props.activeModal}
            addCreatedSpaces={this.addCreatedSpaces}
            addCompanyToDatabase={this.addCompanyToDatabase}
          />
        )}
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
  firestoreConnect()
)(CreateOrganisation);
