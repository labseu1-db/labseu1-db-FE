import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore, withFirebase } from 'react-redux-firebase';
import uuid from 'uuid';

//Redux action
import { showModal } from '../redux/actions/actionCreators';

//Import modals
import CreateOrganisationModal from './Modals/CreateOrganisationModal';
import InviteYourTeamModal from './Modals/InviteYourTeamModal';
import CreateSpacesModal from './Modals/CreateSpacesModal';

//Main component
class CreateNewOrganisation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgName: null,
      teamEmailAddress: ['', '', '', ''],
      createdSpaces: [],
      addedSpace1: '',
      addedSpace2: ''
    };
  }

  //Get information from modals to this main component - these functions are passed to modals
  addOrgName = name => {
    this.setState({ orgName: name });
  };

  addTeamEmailAddress = emails => {
    this.setState({ teamEmailAddress: emails });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addSpace = space => {
    const indexOfSpace = this.state.createdSpaces.indexOf(space);
    console.log(indexOfSpace);
    if (indexOfSpace > -1) {
      const arrayWithoutSpace = this.state.createdSpaces.filter(s => {
        return s !== space;
      });
      this.setState({ createdSpaces: arrayWithoutSpace });
    } else {
      this.setState(pr => ({
        createdSpaces: [...pr.createdSpaces, space]
      }));
    }
  };

  //Add information about created company that were collected in modals to firestore
  addCompanyToDatabase = orgId => {
    let usersEmails = this.state.teamEmailAddress.filter(Boolean).map(e => {
      return e;
    });
    let usersAndAdminsEmails = usersEmails.concat(this.props.auth.email);
    this.props.firestore.set(
      { collection: 'organisations', doc: orgId },
      {
        orgName: this.state.orgName,
        createdByUserId: this.props.auth.uid,
        isPremium: false,
        arrayOfUsersEmails: usersAndAdminsEmails,
        arrayOfAdminsEmails: this.props.auth.email,
        arrayOfAdminsIds: this.props.auth.uid
      }
    );
  };

  //Add information about created spaces that were collected in modals to firestore
  addSpacesToCompaniesAndUsers = orgId => {
    //map trough populates spaces and each add to database = space collection
    this.state.createdSpaces.filter(Boolean).forEach(space => {
      let spaceId = uuid();
      this.props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          orgId: orgId,
          spaceCreatedByUserId: this.props.auth.uid,
          spaceName: space,
          arrayOfUserIdsInSpace: this.props.auth.uid
        }
      );
      //then add each space to users collection
      let userRef = this.props.firestore.collection('userTEST').doc('1234');
      userRef.update({
        arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(space)
      });
    });
    //then add each org to users collection
    let userRef = this.props.firestore.collection('userTEST').doc('1234');
    userRef.update({
      ArrayOfOrgsIds: this.props.firestore.FieldValue.arrayUnion(orgId),
      ArrayOfOrgsNames: this.props.firestore.FieldValue.arrayUnion(this.state.orgName)
    });
  };

  addSpaceFromInput1ToCompaniesAndUsers = orgId => {
    let spaceId = uuid();
    this.state.addedSpace1 !== '' &&
      this.props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          orgId: orgId,
          spaceCreatedByUserId: this.props.auth.uid,
          spaceName: this.state.addedSpace1,
          arrayOfUserIdsInSpace: this.props.auth.uid
        }
      );

    let userRef = this.props.firestore.collection('userTEST').doc('1234');
    this.state.addedSpace1 !== '' &&
      userRef.update({
        arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(this.state.addedSpace1)
      });
  };

  addSpaceFromInput2ToCompaniesAndUsers = orgId => {
    let spaceId = uuid();
    this.state.addedSpace2 !== '' &&
      this.props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          orgId: orgId,
          spaceCreatedByUserId: this.props.auth.uid,
          spaceName: this.state.addedSpace2,
          arrayOfUserIdsInSpace: this.props.auth.uid
        }
      );
    let userRef = this.props.firestore.collection('userTEST').doc('1234');
    this.state.addedSpace2 !== '' &&
      userRef.update({
        arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(this.state.addedSpace2)
      });
  };

  clearState = () => {
    this.setState({
      orgName: null,
      teamEmailAddress: ['', '', '', ''],
      createdSpaces: [],
      addedSpace1: '',
      addedSpace2: ''
    });
  };

  render() {
    return (
      <div>
        {this.props.activeModal === 'CreateOrganisationModal' && (
          <CreateOrganisationModal
            shoudlBeOpen={true}
            showModal={this.props.showModal}
            activeModal={this.props.activeModal}
            addOrgName={this.addOrgName}
          />
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
            createdSpaces={this.state.createdSpaces}
            addSpace={this.addSpace}
            addCompanyToDatabase={this.addCompanyToDatabase}
            addSpacesToCompaniesAndUsers={this.addSpacesToCompaniesAndUsers}
            addSpaceFromInput1ToCompaniesAndUsers={this.addSpaceFromInput1ToCompaniesAndUsers}
            addSpaceFromInput2ToCompaniesAndUsers={this.addSpaceFromInput2ToCompaniesAndUsers}
            handleInputChange={this.handleInputChange}
            clearState={this.clearState}
          />
        )}
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
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(CreateNewOrganisation);
