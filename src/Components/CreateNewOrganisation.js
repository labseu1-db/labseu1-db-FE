import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';
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

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //========= FUNCTIONS TO GET DATA FROM MODALS TO THIS COMPONENT =========//
  //no passing information to database, only getting information from modals
  addOrgName = name => {
    this.setState({ orgName: name });
  };

  addTeamEmailAddress = emails => {
    this.setState({ teamEmailAddress: emails });
  };

  //add space plus following functionality:
  // - make sure, that each space is there only once
  // - toggle adding/removing of space
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

  //after sending data to firestore, clear state
  clearState = () => {
    this.setState({
      orgName: null,
      teamEmailAddress: ['', '', '', ''],
      createdSpaces: [],
      addedSpace1: '',
      addedSpace2: ''
    });
  };
  //========= FUNCTIONS TO GET DATA FROM MODALS TO THIS COMPONENT =========//

  //======== FUNCTIONS TO ADD DATA THAT WERE COLLECTED TO FIRESTORE ========//
  //1. ADD DATA ABOUT ORGANISATION AND USERS TO ORGANISATIONS COLLECTION
  addOrganisationToDatabase = orgId => {
    let usersEmailsWithoutEmptyStrings = this.state.teamEmailAddress.filter(Boolean).map(e => {
      return e;
    });
    //add creators/admins email to the array of users
    let usersAndAdminsEmails = usersEmailsWithoutEmptyStrings.concat(localStorage.getItem('userEmail'));

    //aave all collected data about organisation in firestore
    this.props.firestore.set(
      { collection: 'organisations', doc: orgId },
      {
        orgName: this.state.orgName,
        isPremium: false,
        createdByUserId: localStorage.getItem('uuid'),
        arrayOfUsersEmails: usersAndAdminsEmails,
        arrayOfUsersIds: localStorage.getItem('uuid'),
        arrayOfAdminsEmails: localStorage.getItem('userEmail'),
        arrayOfAdminsIds: localStorage.getItem('uuid')
      }
    );
  };

  //2. ADD DATA ABOUT ORGANISATION TO USERS COLLECTION
  addOrganisationToUsers = orgId => {
    let userRef = this.props.firestore.collection('users').doc(localStorage.getItem('uuid'));
    userRef.update({
      ArrayOfOrgsIds: this.props.firestore.FieldValue.arrayUnion(orgId),
      ArrayOfOrgsNames: this.props.firestore.FieldValue.arrayUnion(this.state.orgName)
    });
  };

  //3. ADD DATA ABOUT CREATED SPACED TO SPACES COLLECTION AND USER COLLECTION
  addSpacesToSpacesAndUsers = orgId => {
    //map trough populated spaces (we will save each space separately)
    this.state.createdSpaces.filter(Boolean).forEach(space => {
      let spaceId = uuid();
      //save each space in spaces collection
      this.props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          spaceName: space,
          orgId: orgId,
          spaceCreatedByUserId: localStorage.getItem('uuid'),
          arrayOfUserIdsInSpace: localStorage.getItem('uuid')
        }
      );

      //add each space in users collection in array (therefore we need to use update instead of add/set)
      let userRef = this.props.firestore.collection('users').doc(localStorage.getItem('uuid'));
      userRef.update({
        arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(space)
      });
    });
  };

  addSpaceFromInput1ToOrganisationsAndUsers = orgId => {
    let spaceId = uuid();
    //save each space in spaces collection
    this.state.addedSpace1 !== '' &&
      this.props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          spaceName: this.state.addedSpace1,
          orgId: orgId,
          spaceCreatedByUserId: localStorage.getItem('uuid'),
          arrayOfUserIdsInSpace: localStorage.getItem('uuid')
        }
      );

    //save each space in users collection
    let userRef = this.props.firestore.collection('users').doc(localStorage.getItem('uuid'));
    this.state.addedSpace1 !== '' &&
      userRef.update({
        arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(this.state.addedSpace1)
      });
  };

  addSpaceFromInput2ToOrganisationsAndUsers = orgId => {
    //save each space in spaces collection
    let spaceId = uuid();
    this.state.addedSpace2 !== '' &&
      this.props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          spaceName: this.state.addedSpace2,
          orgId: orgId,
          spaceCreatedByUserId: localStorage.getItem('uuid'),
          arrayOfUserIdsInSpace: localStorage.getItem('uuid')
        }
      );

    //save each space in users collection
    let userRef = this.props.firestore.collection('users').doc(localStorage.getItem('uuid'));
    this.state.addedSpace2 !== '' &&
      userRef.update({
        arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(this.state.addedSpace2)
      });
  };
  //======== FUNCTIONS TO ADD DATA THAT WERE COLLECTED TO FIRESTORE ========//
  componentDidMount() {
    this.props.showModal('CreateOrganisationModal');
  }

  render() {
    return (
      <div>
        {this.props.activeModal === 'CreateOrganisationModal' && (
          <CreateOrganisationModal
            shoudlBeOpen={true}
            showModal={this.props.showModal}
            activeModal={this.props.activeModal}
            addOrgName={this.addOrgName}
            props={this.props}
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
            addOrganisationToDatabase={this.addOrganisationToDatabase}
            addOrganisationToUsers={this.addOrganisationToUsers}
            addSpacesToSpacesAndUsers={this.addSpacesToSpacesAndUsers}
            addSpaceFromInput1ToOrganisationsAndUsers={this.addSpaceFromInput1ToOrganisationsAndUsers}
            addSpaceFromInput2ToOrganisationsAndUsers={this.addSpaceFromInput2ToOrganisationsAndUsers}
            handleInputChange={this.handleInputChange}
            clearState={this.clearState}
            props={this.props}
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
