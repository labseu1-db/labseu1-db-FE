import React, { useState, useContext, useEffect } from 'react';
import { Header, Modal, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid';
import plusIcon from '../../images/icon-plus-lightgray.svg';
//Redux action

//Styled components
import styled from 'styled-components';

import Context from '../ContextProvider/Context';

const CreateNewSpaceModal = props => {
  // constructor(props) {
  //   super(props);
  //   props.state = {
  //     spaceName: '',
  //     spaceTopic: '',
  //     idsInSpace: [props.uuid]
  //   };
  // }

  const {
    modal,
    setModal,
    closeModal,
    getUsersFromOrg,
    saveData,
    updateDataWithDoc,
    firebase,
    getUserDataRealTime,
    redirect
  } = useContext(Context);

  const [spaceName, setSpaceName] = useState('');
  const [spaceTopic, setSpaceTopic] = useState('');
  const [idsInSpace, setIdsInSpace] = useState([localStorage.getItem('uuid')]);
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let getUserUnsubscribe = getUserDataRealTime(setUser);
    let getUsersUnsubscribe = getUsersFromOrg(setUsers, props.match.params.id);
    return () => {
      getUsersUnsubscribe();
      getUserUnsubscribe();
    };
  }, [getUserDataRealTime, props.match.params.id, getUsersFromOrg]);

  const cleanInputs = () => {
    setIdsInSpace([localStorage.getItem('uuid')]);
    setSpaceName('');
    setSpaceTopic('');
  };

  const addSpaceToDatabase = () => {
    const spaceId = uuid();
    let request = {
      collection: 'spaces',
      docId: spaceId,
      data: {
        spaceName: spaceName,
        spaceCreatedByUserId: user.id,
        spaceTopic: spaceTopic,
        orgId: props.match.params.id,
        arrayOfUserIdsInSpace: idsInSpace
      }
    };
    saveData(request)
      .then(res => addSpaceToUsers(spaceId))
      .then(res => cleanInputs())
      .then(res => redirect(`/mainscreen/${props.match.params.id}/${spaceId}`));
  };

  const addSpaceToUsers = spaceId => {
    idsInSpace.map(id => {
      let request = {
        collection: 'users',
        docId: id,
        data: {
          arrayOfSpaceIds: firebase.firestore.FieldValue.arrayUnion(spaceId),
          arrayOfSpaceNames: firebase.firestore.FieldValue.arrayUnion(spaceName)
        }
      };
      return updateDataWithDoc(request);
    });
  };

  const setIdsToState = (e, data) => {
    e.preventDefault();
    const { value } = data;
    setIdsInSpace(prState => [...prState, ...value]);
  };

  const userIdsOptions = users
    .filter(user => user.id !== props.uuid)
    .map(user => ({
      key: user.id,
      text: user.fullName,
      value: user.id
    }));
  return (
    <div>
      <img
        src={plusIcon}
        alt="plus icon"
        aria-label="OpenCreateNewSpaceModal"
        onClick={() => setModal('CreateSpaceModal')}
        disabled={!props.match.params.id}
      />

      {modal === 'CreateSpaceModal' && (
        <Modal open={true} size="tiny" aria-label="CreateNewSpaceModal">
          <StyledContainer>
            <Modal.Header>
              <div>
                <StyledMainHeader>Create a new space</StyledMainHeader>
              </div>
              <div>
                <Header as="h5">Space name</Header>
                <StyledInput
                  name="spaceName"
                  placeholder="Product Design"
                  type="text"
                  required
                  value={spaceName}
                  onChange={e => setSpaceName(e.target.value)}
                />
                <Header as="h5">
                  What types of discussions happen here?
                  <StyledOptional>(Optional)</StyledOptional>
                </Header>
                <StyledInput
                  name="spaceTopic"
                  placeholder="Questions and thoughts about proposals"
                  type="text"
                  value={spaceTopic}
                  onChange={e => setSpaceTopic(e.target.value)}
                />
                <Header as="h5">Members</Header>
                <StyledDropdown>
                  <Dropdown
                    placeholder="Choose people to add"
                    fluid
                    multiple
                    search
                    selection
                    options={userIdsOptions}
                    onChange={setIdsToState}
                  />
                </StyledDropdown>
                <Modal.Actions>
                  <StyledActions>
                    <StyledButtonCancel onClick={closeModal}>
                      Cancel
                    </StyledButtonCancel>

                    <StyledButtonCreateSpace
                      type="submit"
                      disabled={
                        spaceName.length === 0 ||
                        spaceTopic.length === 0 ||
                        idsInSpace.length === 0
                      }
                      onClick={e => {
                        addSpaceToDatabase();
                        closeModal(e);
                      }}
                    >
                      Create Space
                    </StyledButtonCreateSpace>
                  </StyledActions>
                </Modal.Actions>
              </div>
            </Modal.Header>
          </StyledContainer>
        </Modal>
      )}
    </div>
  );
};

//Styled Components
export default CreateNewSpaceModal;

const StyledContainer = styled.div`
  padding: 40px;
  border-radius: 6px;
  position: relative;
`;
const StyledButtonCancel = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: #00bc98;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #00bc98;
  margin-right: 10px;
`;
const StyledButtonCreateSpace = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #00bc98;
  border-radius: 15px;
  outline: none;
  background-color: #00bc98;
  &:disabled {
    background-color: #00bc9880;
    border: none;
  }
`;

const StyledDropdown = styled.div`
  .ui.dropdown .menu > .item:hover {
    background: #00bc98;
    color: white;
  }
  .item {
    margin: 5px;
    border-radius: 5px;
  }
  .ui.label {
    background: #00bc98;
    color: white;
    border: none;
  }
  .i.icon.delete {
    color: white;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #374750;
  border: none;
  border-bottom: 2px solid lightgray;
  padding: 5px 0;
  margin-bottom: 10px;
  &:focus {
    border-bottom: 2px solid #00bc98;
    outline: none;
  }
`;
const StyledMainHeader = styled.div`
  font-size: 24px;
  color: rgb(55, 71, 80);
  font-family: 'Open Sans', sans-serif;
  padding-bottom: 30px;
`;
const StyledOptional = styled.div`
  font-size: 11px;
  font-family: 'Open Sans', sans-serif;
  color: #374750;
  margin-left: 257px;
  margin-top: -19px;
`;
const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;
