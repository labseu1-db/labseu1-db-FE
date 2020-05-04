import React, { useEffect, useState, useContext } from 'react';
import uuid from 'uuid';
import Spinner from './semantic-components/Spinner';

//Import modals
import CreateOrganisationModal from './Modals/CreateOrganisationModal';
import InviteYourTeamModal from './Modals/InviteYourTeamModal';
import CreateSpacesModal from './Modals/CreateSpacesModal';

// import Context API
import Context from './ContextProvider/Context';

//Main component
const CreateNewOrganisation = props => {
  // constructor(props) {
  //   super(props);

  //   state = {
  //     orgName: null,
  //     teamEmailAddress: ['', '', '', ''],
  //     createdSpaces: [],
  //     addedSpace1: '',
  //     addedSpace2: '',
  //     savingInfoToDb: false
  //   };
  // }

  const { setModal, modal } = useContext(Context);

  const [orgName, setOrgName] = useState('');
  const [teamEmailAddress, setTeamEmailAddress] = useState(['', '', '', '']);
  const [createdSpaces, setCreatedSpaces] = useState([]);
  const [addedSpace1, setAddedSpace1] = useState('');
  const [addedSpace2, setAddedSpace2] = useState('');
  const [savingInfoToDb, setSavingInfoToDb] = useState(false);

  const handleInputChange = e => {
    // setState({ [e.target.name]: e.target.value });
  };

  //========= FUNCTIONS TO GET DATA FROM MODALS TO THIS COMPONENT =========//
  //no passing information to database, only getting information from modals
  const addOrgName = name => {
    setOrgName(name);
  };

  const addTeamEmailAddress = emails => {
    setTeamEmailAddress(emails);
  };

  //add space plus following functionality:
  // - make sure, that each space is there only once
  // - toggle adding/removing of space
  const addSpace = space => {
    const indexOfSpace = createdSpaces.indexOf(space);
    if (indexOfSpace > -1) {
      const arrayWithoutSpace = createdSpaces.filter(s => {
        return s !== space;
      });
      setCreatedSpaces(arrayWithoutSpace);
    } else {
      setCreatedSpaces(pr => [...pr, space]);
    }
  };

  //after sending data to firestore, clear state
  const clearState = () => {
    setOrgName(null);
    setTeamEmailAddress(['', '', '', '']);
    setCreatedSpaces([]);
    setAddedSpace1('');
    setAddedSpace2('');
  };
  //========= FUNCTIONS TO GET DATA FROM MODALS TO THIS COMPONENT =========//

  //======== FUNCTIONS TO ADD DATA THAT WERE COLLECTED TO FIRESTORE ========//
  //1. ADD DATA ABOUT ORGANISATION AND USERS TO ORGANISATIONS COLLECTION
  const addOrganisationToDatabase = orgId => {
    let usersEmailsWithoutEmptyStrings = teamEmailAddress
      .filter(Boolean)
      .map(e => {
        return e;
      });
    //add creators/admins email to the array of users
    let usersAndAdminsEmails = usersEmailsWithoutEmptyStrings.concat(
      localStorage.getItem('userEmail')
    );

    //aave all collected data about organisation in firestore
    return props.firestore
      .set(
        { collection: 'organisations', doc: orgId },
        {
          orgName: orgName,
          isPremium: false,
          createdByUserId: localStorage.getItem('uuid'),
          arrayOfUsersEmails: usersAndAdminsEmails,
          arrayOfUsersIds: [localStorage.getItem('uuid')],
          arrayOfAdminsEmails: [localStorage.getItem('userEmail')],
          arrayOfAdminsIds: [localStorage.getItem('uuid')]
        }
      )
      .then(() => {
        localStorage.setItem('activeOrg', orgId);
      });
  };

  //2. ADD DATA ABOUT ORGANISATION TO USERS COLLECTION
  const addOrganisationToUsers = orgId => {
    let userRef = props.firestore
      .collection('users')
      .doc(localStorage.getItem('uuid'));
    userRef.update({
      arrayOfOrgsIds: props.firestore.FieldValue.arrayUnion(orgId),
      arrayOfOrgsNames: props.firestore.FieldValue.arrayUnion(orgName)
    });
    setSavingInfoToDb(true);
  };

  //3. ADD DATA ABOUT CREATED SPACED TO SPACES COLLECTION AND USER COLLECTION
  const addSpacesToSpacesAndUsers = orgId => {
    //map trough populated spaces (we will save each space separately)
    createdSpaces.filter(Boolean).forEach(space => {
      let spaceId = uuid();
      //save each space in spaces collection
      props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          spaceName: space,
          orgId: orgId,
          spaceCreatedByUserId: localStorage.getItem('uuid'),
          arrayOfUserIdsInSpace: [localStorage.getItem('uuid')]
        }
      );

      //add each space in users collection in array (therefore we need to use update instead of add/set)
      let userRef = props.firestore
        .collection('users')
        .doc(localStorage.getItem('uuid'));
      return userRef.update({
        arrayOfSpaceIds: props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: props.firestore.FieldValue.arrayUnion(space)
      });
    });
  };

  const addSpaceFromInput1ToOrganisationsAndUsers = orgId => {
    let spaceId = uuid();
    //save each space in spaces collection
    addedSpace1 !== '' &&
      props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          spaceName: addedSpace1,
          orgId: orgId,
          spaceCreatedByUserId: localStorage.getItem('uuid'),
          arrayOfUserIdsInSpace: [localStorage.getItem('uuid')]
        }
      );

    //save each space in users collection
    let userRef = props.firestore
      .collection('users')
      .doc(localStorage.getItem('uuid'));
    addedSpace1 !== '' &&
      userRef.update({
        arrayOfSpaceIds: props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: props.firestore.FieldValue.arrayUnion(addedSpace1)
      });
  };

  const addSpaceFromInput2ToOrganisationsAndUsers = orgId => {
    //save each space in spaces collection
    let spaceId = uuid();
    addedSpace2 !== '' &&
      props.firestore.set(
        { collection: 'spaces', doc: spaceId },
        {
          spaceName: addedSpace2,
          orgId: orgId,
          spaceCreatedByUserId: localStorage.getItem('uuid'),
          arrayOfUserIdsInSpace: [localStorage.getItem('uuid')]
        }
      );

    //save each space in users collection
    let userRef = props.firestore
      .collection('users')
      .doc(localStorage.getItem('uuid'));
    addedSpace2 !== '' &&
      userRef.update({
        arrayOfSpaceIds: props.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: props.firestore.FieldValue.arrayUnion(addedSpace2)
      });
  };
  //======== FUNCTIONS TO ADD DATA THAT WERE COLLECTED TO FIRESTORE ========//
  useEffect(() => {
    console.log('running');
    setModal('CreateOrganisationModal');
  }, [setModal]);

  if (savingInfoToDb === true) {
    return <Spinner />;
  }
  return (
    <div>
      {modal === 'CreateOrganisationModal' && (
        <CreateOrganisationModal
          shoudlBeOpen={true}
          showModal={setModal}
          activeModal={modal}
          addOrgName={addOrgName}
          props={props}
        />
      )}
      {modal === 'InviteYourTeamModal' && (
        <InviteYourTeamModal
          shoudlBeOpen={true}
          showModal={setModal}
          activeModal={modal}
          addTeamEmailAddress={addTeamEmailAddress}
          teamEmailAddress={teamEmailAddress}
        />
      )}
      {modal === 'CreateSpacesModal' && (
        <CreateSpacesModal
          shoudlBeOpen={true}
          showModal={setModal}
          activeModal={modal}
          createdSpaces={createdSpaces}
          addSpace={addSpace}
          addOrganisationToDatabase={addOrganisationToDatabase}
          addOrganisationToUsers={addOrganisationToUsers}
          addSpacesToSpacesAndUsers={addSpacesToSpacesAndUsers}
          addSpaceFromInput1ToOrganisationsAndUsers={
            addSpaceFromInput1ToOrganisationsAndUsers
          }
          addSpaceFromInput2ToOrganisationsAndUsers={
            addSpaceFromInput2ToOrganisationsAndUsers
          }
          handleInputChange={handleInputChange}
          clearState={clearState}
          props={props}
        />
      )}
    </div>
  );
};

export default CreateNewOrganisation;
