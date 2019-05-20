import React, { Component } from 'react';
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

class CreateNewSpaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceName: '',
      spaceTopic: '',
      idsInSpace: [this.props.uuid]
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOpen = () => {
    this.setState({ model_open: true });
  };

  handleClose = () => {
    this.setState({ model_open: false });
  };

  cleanInputs = () => {
    this.setState({
      spaceName: '',
      spaceTopic: '',
      idsInSpace: [this.props.uuid]
    });
  };

  addSpaceToDatabase = () => {
    const spaceId = uuid();
    this.props.firestore
      .set(
        { collection: 'spaces', doc: spaceId },
        {
          spaceName: this.state.spaceName,
          spaceCreatedByUserId: window.localStorage.getItem('uuid'),
          spaceTopic: this.state.spaceTopic,
          orgId: this.props.activeOrg,
          arrayOfUserIdsInSpace: this.state.idsInSpace
        }
      )
      .then(res => this.addSpaceToUsers(spaceId))
      .then(res => this.cleanInputs());
  };

  addSpaceToUsers = spaceId => {
    this.state.idsInSpace.map(id => {
      return this.props.firestore.update(
        { collection: 'users', doc: id },
        {
          arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(spaceId),
          arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(this.state.spaceName)
        }
      );
    });
  };

  setIdsToState = (e, data) => {
    e.preventDefault();
    const { value } = data;
    this.setState(prState => ({ idsInSpace: [...prState.idsInSpace, ...value] }));
  };
  render() {
    const { organisation } = this.props;

    if (isEmpty(organisation)) {
      return <Spinner />;
    } else {
      const userIdsOptions = this.props.listOfUsersWithinTheOrg
        .filter(user => user.id !== this.props.uuid)
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
                onClick={this.handleOpen}
                disabled={isEmpty(localStorage.getItem('activeOrg'))}
              />
            </div>
          }
          open={this.state.model_open}
          size="tiny">
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
                  value={this.state.spaceName}
                  onChange={this.handleInputChange}
                />
                <Header as="h5">
                  What types of discussions happen here?
                  <StyledOptional>(Optional)</StyledOptional>
                </Header>
                <StyledInput
                  name="spaceTopic"
                  placeholder="Questions and thoughts about proposals"
                  type="text"
                  value={this.state.spaceTopic}
                  onChange={this.handleInputChange}
                />
                <Header as="h5">Members</Header>
                <Dropdown
                  placeholder="Choose people to add"
                  fluid
                  multiple
                  search
                  selection
                  options={userIdsOptions}
                  onChange={this.setIdsToState}
                />
                <Modal.Actions>
                  <StyledActions>
                    <StyledButtonCancel onClick={this.handleClose}>Cancel</StyledButtonCancel>

                    <StyledButtonCreateSpace
                      type="submit"
                      disabled={!this.state.spaceName.length > 0 || !this.state.spaceTopic.length > 0}
                      onClick={e => {
                        this.addSpaceToDatabase();
                        this.props.showModal(null);
                        this.handleClose();
                      }}>
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
  }
}

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
    activeOrg: localStorage.getItem('activeOrg') ? localStorage.getItem('activeOrg') : '',
    organisation: state.firestore.ordered.activeOrgFromDatabase ? state.firestore.ordered.activeOrgFromDatabase : [],
    user: state.firestore.ordered.users ? state.firestore.ordered.users : [],
    uuid: localStorage.getItem('uuid') ? localStorage.getItem('uuid') : '',
    listOfUsersWithinTheOrg: state.firestore.ordered.usersWithinTheOrg ? state.firestore.ordered.usersWithinTheOrg : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ showModal }, dispatch);
};

//Styled Components
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: 'organisations',
        doc: `${props.activeOrg}`,
        storeAs: 'activeOrgFromDatabase'
      },
      {
        collection: 'users',
        doc: `${props.uuid}`
      },
      {
        collection: 'users',
        where: [['arrayOfOrgsIds', 'array-contains', `${props.activeOrg}`]],
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
  color: #5c4df2;
  border-radius: 15px;
  background-color: white;
  border: 1px solid #5c4df2;
  margin-right: 10px;
`;
const StyledButtonCreateSpace = styled.button`
  cursor: pointer;
  padding: 5px 25px;
  color: white;
  border: 1px solid #5c4df2;
  border-radius: 15px;
  outline: none;
  background-color: #5c4df2;
  &:disabled {
    background-color: #cfd5f2;
    border: 1px solid #cfd5f2;
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
    border-bottom: 2px solid #6c48f2;
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
