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

  const {
    setModal,
    modal,
    getUserData,
    saveData,
    updateDataWithDoc,
    firebase
  } = useContext(Context);

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
  const addOrganisationToDatabase = async orgId => {
    let usersEmailsWithoutEmptyStrings = teamEmailAddress
      .filter(Boolean)
      .map(e => {
        return e;
      });
    //add creators/admins email to the array of users
    let user = await getUserData();
    let usersAndAdminsEmails = usersEmailsWithoutEmptyStrings.concat(
      user.userEmail
    );

    //aave all collected data about organisation in firestore
    let request = {
      collection: 'organisations',
      docId: orgId,
      data: {
        orgName: orgName,
        isPremium: false,
        createdByUserId: localStorage.getItem('uuid'),
        arrayOfUsersEmails: usersAndAdminsEmails,
        arrayOfUsersIds: [localStorage.getItem('uuid')],
        arrayOfAdminsEmails: [localStorage.getItem('userEmail')],
        arrayOfAdminsIds: [localStorage.getItem('uuid')]
      }
    };
    return saveData(request);
  };

  //2. ADD DATA ABOUT ORGANISATION TO USERS COLLECTION
  const addOrganisationToUsers = orgId => {
    let request = {
      collection: 'users',
      docId: localStorage.getItem('uuid'),
      data: {
        arrayOfOrgsIds: firebase.firestore.FieldValue.arrayUnion(orgId),
        arrayOfOrgsNames: firebase.firestore.FieldValue.arrayUnion(orgName)
      }
    };
    updateDataWithDoc(request);
    setSavingInfoToDb(true);
  };

  //3. ADD DATA ABOUT CREATED SPACED TO SPACES COLLECTION AND USER COLLECTION
  const addSpacesToSpacesAndUsers = orgId => {
    //map trough populated spaces (we will save each space separately)
    createdSpaces.filter(Boolean).forEach(space => {
      let spaceId = uuid();
      //save each space in spaces collection
      let request = {
        collection: 'spaces',
        docId: spaceId,
        data: {
          spaceName: space,
          orgId: orgId,
          spaceCreatedByUserId: localStorage.getItem('uuid'),
          arrayOfUserIdsInSpace: [localStorage.getItem('uuid')]
        }
      };
      saveData(request);

      //add each space in users collection in array (therefore we need to use update instead of add/set)
      let updateRequest = {
        collection: 'users',
        docId: localStorage.getItem('uuid'),
        data: {
          arrayOfSpaceIds: firebase.firestore.FieldValue.arrayUnion(spaceId),
          arrayOfSpaceNames: firebase.firestore.FieldValue.arrayUnion(space)
        }
      };
      updateDataWithDoc(updateRequest);
    });
  };

  const addSpaceFromInput1ToOrganisationsAndUsers = orgId => {
    let spaceId = uuid();
    //save each space in spaces collection
    let request = {
      collection: 'spaces',
      docId: spaceId,
      data: {
        spaceName: addedSpace1,
        orgId: orgId,
        spaceCreatedByUserId: localStorage.getItem('uuid'),
        arrayOfUserIdsInSpace: [localStorage.getItem('uuid')]
      }
    };
    addedSpace1 !== '' && saveData(request);

    //save each space in users collection
    let updateRequest = {
      collection: 'users',
      docId: localStorage.getItem('uuid'),
      data: {
        arrayOfSpaceIds: firebase.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: firebase.firestore.FieldValue.arrayUnion(addedSpace1)
      }
    };
    addedSpace1 !== '' && updateDataWithDoc(updateRequest);
  };

  const addSpaceFromInput2ToOrganisationsAndUsers = orgId => {
    //save each space in spaces collection
    let spaceId = uuid();
    let request = {
      collection: 'spaces',
      docId: spaceId,
      data: {
        spaceName: addedSpace2,
        orgId: orgId,
        spaceCreatedByUserId: localStorage.getItem('uuid'),
        arrayOfUserIdsInSpace: [localStorage.getItem('uuid')]
      }
    };
    addedSpace2 !== '' && saveData(request);

    //save each space in users collection
    let updateRequest = {
      collection: 'users',
      docId: localStorage.getItem('uuid'),
      data: {
        arrayOfSpaceIds: firebase.firestore.FieldValue.arrayUnion(spaceId),
        arrayOfSpaceNames: firebase.firestore.FieldValue.arrayUnion(addedSpace2)
      }
    };

    addedSpace2 !== '' && updateDataWithDoc(updateRequest);
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
