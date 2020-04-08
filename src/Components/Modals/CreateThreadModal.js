import React, { useState, useContext, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Modal, Dropdown } from 'semantic-ui-react';
import uuid from 'uuid';
import 'draft-js/dist/Draft.css';
import styled from 'styled-components';

// Context
import Context from '../ContextProvider/Context';

const CreateThreadModal = props => {
  const { setError, getSpacesWithOrg, firebase, getUserData } = useContext(
    Context
  );

  console.log(firebase.auth().currentUser);

  const [threadName, setThreadName] = useState('');
  const [threadTopic, setThreadTopic] = useState('');
  const [spaceId, setSpaceId] = useState('');
  const [threadCreatedByUserName, setThreadCreatedByUserName] = useState('');
  const [spaces, setSpaces] = useState([]);

  const setData = useCallback(async () => {
    let spaces = await getSpacesWithOrg(props.match.params.id);
    let user = await getUserData();
    setThreadCreatedByUserName(user.userName);
    setSpaces(spaces);
  }, [getSpacesWithOrg, getUserData, props.match.params.id]);

  useEffect(() => {
    setData();
  }, [setData]);
  const saveSpaceToThread = (e, data) => {
    e.preventDefault();
    const { value } = data;
    setSpaceId(value);
  };

  const handleInputChange = event => {
    if (
      threadName.length <= 40 ||
      event.target.name !== 'threadName' ||
      window.event.inputType === 'deleteContentBackward'
    ) {
      switch (event.target.name) {
        case 'threadTopic':
          setThreadTopic(event.target.value);
          break;
        case 'threadName':
          setThreadName(event.target.value);
          break;
        default:
          break;
      }
    } else if (threadName.length > 40 && event.target.name === 'threadName') {
      setError('toManyCharactersInThreadName');
    }
  };

  const threadId = uuid();
  const addNewThread = () => {
    props.firestore
      .set(
        { collection: 'threads', doc: threadId },
        {
          threadName: threadName,
          threadTopic: threadTopic,
          threadCreatedByUserId: window.localStorage.getItem('uuid'),
          threadCreatedByUserName: threadCreatedByUserName,
          threadCreatedAt: Date.now(),
          spaceId: spaceId,
          orgId: props.match.params.id,
          lastCommentCreatedAt: Date.now(),
          whenUserHasSeen: { [localStorage.getItem('uuid')]: Date.now() }
        }
      )
      .then(() => {
        let threadRef = props.firestore.collection('threads').doc(threadId);
        let whenUserHasSeen = {};
        whenUserHasSeen[
          `whenUserHasSeen.${localStorage.getItem('uuid')}`
        ] = Date.now();
        threadRef.update(whenUserHasSeen);
      })
      .then(() => props.showModal(null))
      .then(() =>
        props.history.push(
          `/mainscreen/${props.match.params.id}/${props.match.params.spaceId}/${threadId}`
        )
      )
      .catch(err => console.log(err));
  };

  const spaceOptions = spaces.map((space, index) => ({
    key: index,
    text: space.spaceName,
    value: `${space.id}`
  }));

  return (
    <Modal open={props.shoudlBeOpen} size="small">
      <MiniModalRight>
        <StyledDropdown>
          <Dropdown
            placeholder="Add a Space"
            fluid
            search
            selection
            options={spaceOptions}
            basic={true}
            onChange={saveSpaceToThread}
          />
        </StyledDropdown>
      </MiniModalRight>
      <Modal.Content>
        <StyledInputsContainer>
          <StyledTitleInput
            name="threadName"
            type="text"
            placeholder="Create a title"
            required
            value={threadName}
            onChange={event => handleInputChange(event)}
          />
          <StyledThreadInput></StyledThreadInput>
        </StyledInputsContainer>
      </Modal.Content>

      <Modal.Actions>
        <StyledActions>
          <div>
            <StyledBackButton
              onClick={e => {
                e.preventDefault();
                props.showModal(null);
              }}
            >
              Back
            </StyledBackButton>
            <StyledButton
              disabled={!threadName.length > 0 || !spaceId.length > 0}
              onClick={() => {
                addNewThread();
              }}
            >
              Post
            </StyledButton>
          </div>
        </StyledActions>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateThreadModal;

const MiniModalRight = styled.div`
  position: absolute;
  right: -250px;
  width: 200px;
  padding: 15px 10px;
  background-color: #11282d;
  border-radius: 15px;
  .ui.selection.dropdown {
    color: white;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;
const StyledDropdown = styled.div`
  .ui.dropdown .menu > .item:hover {
    background: #00bc98;
    color: white;
  }
  .ui.dropdown:not(.button) > .default.text {
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
  div {
    color: white;
  }
`;

const StyledInputsContainer = styled.div`
  padding: 10px 30px;
  height: 500px;
`;
const StyledTitleInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 56px;
  font-family: 'Open Sans', sans-serif;
  font-size: 36px;
  font-weight: 300;
  line-height: 1.11;
  margin-bottom: 20px;
`;
const StyledThreadInput = styled.div`
  border: none;
  outline: none;
  width: 100%;
  height: 320px;
`;
const StyledActions = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledButton = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #00bc98;
  border-radius: 15px;
  outline: none;
  background-color: #00bc98;
  margin-right: 10px;
  &:disabled {
    background-color: #00bc9880;
    border: none;
  }
`;
const StyledBackButton = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: #00bc98;
  border: 1px solid #00bc98;
  border-radius: 15px;
  outline: none;
  background-color: white;
  margin-right: 10px;
  &:disabled {
    background-color: #00bc9880;
    border: none;
  }
`;
