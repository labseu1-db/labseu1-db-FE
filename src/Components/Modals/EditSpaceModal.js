import React, { useState, useContext } from 'react';
import { Header, Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Redux action
import { showModal } from '../../redux/actions/actionCreators';

//Styled components
import styled from 'styled-components';

// import Context API
import Context from '../ContextProvider/Context';

const EditSpaceModal = props => {
  // constructor(props) {
  //   super(props);
  //   state = {
  //     spaceName: props.space.spaceName,
  //     spaceTopic: props.space.spaceTopic,
  //     idsInSpace: props.space.arrayOfUserIdsInSpace
  //   };
  // }

  const { closeModal } = useContext(Context);

  const [spaceName, setSpaceName] = useState(props.space.spaceName);
  const [spaceTopic, setSpaceTopic] = useState(props.space.spaceTopic);
  const [idsInSpace, setIdsInSpace] = useState(
    props.space.arrayOfUserIdsInSpace
  );

  const handleInputChange = e => {
    switch (e.target.name) {
      case 'spaceName':
        setSpaceName(e.target.value);
        break;
      case 'spaceTopic':
        setSpaceTopic(e.target.value);
        break;
      default:
    }
  };

  const updateSpaceToDatabase = () => {
    props.firestore.update(
      { collection: 'spaces', doc: props.space.id },
      {
        spaceName: spaceName,
        spaceTopic: spaceTopic,
        arrayOfUserIdsInSpace: idsInSpace
      }
    );
  };
  const addSpaceToUsers = () => {
    idsInSpace.map(id => {
      return props.firestore.update(
        { collection: 'users', doc: id },
        {
          arrayOfSpaceIds: props.firestore.FieldValue.arrayUnion(
            props.space.id
          ),
          arrayOfSpaceNames: props.firestore.FieldValue.arrayUnion(spaceName)
        }
      );
    });
  };

  const removeSpaceFromUsers = () => {
    props.space.arrayOfUserIdsInSpace
      .filter(id => idsInSpace.indexOf(id) === -1)
      .map(id => {
        return props.firestore.update(
          { collection: 'users', doc: id },
          {
            arrayOfSpaceIds: props.firestore.FieldValue.arrayRemove(
              props.space.id
            ),
            arrayOfSpaceNames: props.firestore.FieldValue.arrayRemove(spaceName)
          }
        );
      });
  };

  const setIdsToState = (e, data) => {
    e.preventDefault();
    const { value } = data;
    setIdsInSpace(value);
  };

  const userIdsOptions = props.listOfUsersWithinTheOrg
    .filter(user => user.id !== props.uuid)
    .map(user => ({
      key: user.id,
      text: user.fullName,
      value: user.id
    }));

  return (
    <Modal open={props.shoudlBeOpen} size="tiny">
      <StyledContainer>
        <Modal.Header>
          <div>
            <StyledMainHeader>Edit {props.space.spaceName}</StyledMainHeader>
          </div>
          <div>
            <Header as="h5">Space name</Header>
            <StyledInput
              name="spaceName"
              type="text"
              required
              value={spaceName}
              onChange={handleInputChange}
            />
            <Header as="h5">
              What types of discussions happen here?
              <StyledOptional>(Optional)</StyledOptional>
            </Header>
            <StyledInput
              name="spaceTopic"
              type="text"
              value={spaceTopic}
              onChange={handleInputChange}
            />
            <Header as="h5">Members</Header>
            <Dropdown
              placeholder="Choose people to add"
              fluid
              multiple
              search
              selection
              defaultValue={idsInSpace}
              options={userIdsOptions}
              onChange={setIdsToState}
            />
            <Modal.Actions>
              <StyledActions>
                <StyledButtonCancel
                  onClick={() => {
                    closeModal();
                  }}
                >
                  Cancel
                </StyledButtonCancel>

                <StyledButtonCreateSpace
                  type="submit"
                  disabled={!spaceName.length > 0 || !idsInSpace.length > 0}
                  onClick={e => {
                    e.preventDefault();
                    updateSpaceToDatabase();
                    addSpaceToUsers();
                    removeSpaceFromUsers();
                    closeModal();
                  }}
                >
                  Edit Space
                </StyledButtonCreateSpace>
              </StyledActions>
            </Modal.Actions>
          </div>
        </Modal.Header>
      </StyledContainer>
    </Modal>
  );
};

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    user: state.firestore.ordered.users ? state.firestore.ordered.users : [],
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    listOfUsersWithinTheOrg: state.firestore.ordered.usersWithinTheOrg
      ? state.firestore.ordered.usersWithinTheOrg
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal }, dispatch);
};

//Styled Components
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: 'users',
        doc: `${props.uuid}`
      },
      {
        collection: 'users',
        where: [
          ['arrayOfOrgsIds', 'array-contains', `${props.match.params.id}`]
        ],
        storeAs: 'usersWithinTheOrg'
      }
    ];
  }),
  withFirestore
)(EditSpaceModal);

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
