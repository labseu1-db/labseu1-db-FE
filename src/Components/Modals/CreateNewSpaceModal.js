import React, { useState, useContext } from 'react';
import { Header, Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore, isEmpty } from 'react-redux-firebase';
import Spinner from '../semantic-components/Spinner';
import uuid from 'uuid';
import plusIcon from '../../images/icon-plus-lightgray.svg';

//Redux action
import { showModal } from '../../redux/actions/actionCreators';

//Styled components
import styled from 'styled-components';

const CreateNewSpaceModal = props => {
  // constructor(props) {
  //   super(props);
  //   props.state = {
  //     spaceName: '',
  //     spaceTopic: '',
  //     idsInSpace: [props.uuid]
  //   };
  // }
  console.log(props);

  const [model_open, setModel_open] = useState(false);
  const [spaceName, setSpaceName] = useState('');
  const [spaceTopic, setSpaceTopic] = useState('');
  const [idsInSpace, setIdsInSpace] = useState([localStorage.getItem('uuid')]);

  const handleInputChange = e => {
    props.setState({ [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    props.setState({ model_open: true });
  };

  const handleClose = () => {
    props.setState({ model_open: false });
  };

  const cleanInputs = () => {
    props.setState({
      spaceName: '',
      spaceTopic: '',
      idsInSpace: [props.uuid]
    });
  };

  const addSpaceToDatabase = () => {
    const spaceId = uuid();
    props.firestore
      .set(
        { collection: 'spaces', doc: spaceId },
        {
          spaceName: props.state.spaceName,
          spaceCreatedByUserId: window.localStorage.getItem('uuid'),
          spaceTopic: props.state.spaceTopic,
          orgId: props.match.params.id,
          arrayOfUserIdsInSpace: props.state.idsInSpace
        }
      )
      .then(res => props.addSpaceToUsers(spaceId))
      .then(res => props.cleanInputs())
      .then(res =>
        props.history.push(`/mainscreen/${props.match.params.id}/${spaceId}`)
      );
  };

  const addSpaceToUsers = spaceId => {
    props.state.idsInSpace.map(id => {
      return props.firestore.update(
        { collection: 'users', doc: id },
        {
          arrayOfSpaceIds: props.firestore.FieldValue.arrayUnion(spaceId),
          arrayOfSpaceNames: props.firestore.FieldValue.arrayUnion(
            props.state.spaceName
          )
        }
      );
    });
  };

  const setIdsToState = (e, data) => {
    e.preventDefault();
    const { value } = data;
    props.setState(prState => ({
      idsInSpace: [...prState.idsInSpace, ...value]
    }));
  };
  const { organisation } = props;

  if (isEmpty(organisation)) {
    return <Spinner />;
  } else {
    const userIdsOptions = props.listOfUsersWithinTheOrg
      .filter(user => user.id !== props.uuid)
      .map(user => ({
        key: user.id,
        text: user.fullName,
        value: user.id
      }));
    return (
      <Modal
        trigger={
          <div>
            <img
              src={plusIcon}
              alt="plus icon"
              onClick={props.handleOpen}
              disabled={isEmpty(localStorage.getItem('activeOrg'))}
            />
          </div>
        }
        open={model_open}
        size="tiny"
      >
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
                onChange={props.handleInputChange}
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
                  onChange={props.setIdsToState}
                />
              </StyledDropdown>
              <Modal.Actions>
                <StyledActions>
                  <StyledButtonCancel onClick={props.handleClose}>
                    Cancel
                  </StyledButtonCancel>

                  <StyledButtonCreateSpace
                    type="submit"
                    disabled={
                      spaceName.length > 0 ||
                      spaceTopic.length > 0 ||
                      idsInSpace.length > 0
                    }
                    onClick={e => {
                      props.addSpaceToDatabase();
                      props.showModal(null);
                      props.handleClose();
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
    );
  }
};

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    activeOrg: localStorage.getItem('activeOrg')
      ? localStorage.getItem('activeOrg')
      : '',
    organisation: state.firestore.ordered.activeOrgFromDatabase
      ? state.firestore.ordered.activeOrgFromDatabase
      : [],
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
        collection: 'organisations',
        doc: props.match.params.id,
        storeAs: 'activeOrgFromDatabase'
      },
      {
        collection: 'users',
        doc: `${props.uuid}`
      },
      {
        collection: 'users',
        where: [['arrayOfOrgsIds', 'array-contains', props.match.params.id]],
        storeAs: 'usersWithinTheOrg'
      }
    ];
  }),
  withFirestore
)(CreateNewSpaceModal);

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
