import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import uuid from 'uuid';

//Redux action
import { showModal } from '../redux/actions/actionCreators';

//Import modals
import CreateOrganisationModal from './modals/CreateOrganisationModal';
import InviteYourTeamModal from './modals/InviteYourTeamModal';
import CreateSpacesModal from './modals/CreateSpacesModal';

//Import spinner
import Spinner from './semantic-components/Spinner';

//Main component
class CreateNewOrganisation extends Component {
  state = {
    orgName: null,
    teamEmailAddress: ['', '', '', ''],
    createdSpaces: []
  };

  //Get information from modals to this main component - these functions are passed to modals
  addOrgName = name => {
    this.setState({ orgName: name });
  };

  addTeamEmailAddress = emails => {
    this.setState({ teamEmailAddress: emails });
  };

  addCreatedSpaces = spaces => {
    this.setState({ createdSpaces: spaces });
  };

  //Add information about created company that were collected in modals to firestore
  orgId = uuid();
  addCompanyToDatabase = () => {
    this.props.firestore.set(
      { collection: 'companiesTEST', doc: this.orgId },
      {
        orgName: this.state.orgName,
        createdByUserId: this.props.auth.uid,
        isPremium: false,
        arrayOfUsers: this.state.teamEmailAddress.filter(Boolean).map(e => {
          return { userEmail: e };
        }),
        arrayOfAdmins: { userEmail: this.props.auth.uid, userId: this.props.auth.email }
      }
    );
  };

  //Add information about created spaces that were collected in modals to firestore
  addSpacesToCompanies = () => {
    this.state.createdSpaces.filter(Boolean).map(space => {
      this.props.firestore.set(
        { collection: 'companiesTEST', doc: uuid() },
        {
          orgId: this.orgId,
          spaceCreatedByUserId: this.props.auth.uid,
          spaceName: space
        }
      );
    });
  };

  //If user is not logged in, push user to login page
  componentDidUpdate() {
    if (isEmpty(this.props.auth)) {
      this.props.history.push('/login');
    }
  }

  render() {
    if (!isLoaded(this.props.auth)) {
      return <Spinner />;
    }
    console.log(this.props.auth);

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
            addSpacesToCompanies={this.addSpacesToCompanies}
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

//Export component wrapped in redux actions and store and firestore
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
)(CreateNewOrganisation);
