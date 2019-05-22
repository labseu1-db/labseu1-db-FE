import React, { Component } from 'react';
import { Header, Modal, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firestoreConnect, withFirestore } from 'react-redux-firebase';

//Redux action
import { showModal } from '../../redux/actions/actionCreators';

//Styled components
import styled from 'styled-components';

class EditSpaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceName: this.props.space.spaceName,
      spaceTopic: this.props.space.spaceTopic,
      idsInSpace: this.props.space.arrayOfUserIdsInSpace
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

  updateSpaceToDatabase = () => {
    this.props.firestore.update(
      { collection: 'spaces', doc: this.props.space.id },
      {
        spaceName: this.state.spaceName,
        spaceTopic: this.state.spaceTopic,
        arrayOfUserIdsInSpace: this.state.idsInSpace
      }
    );
  };
  addSpaceToUsers = () => {
    this.state.idsInSpace.map(id => {
      return this.props.firestore.update(
        { collection: 'users', doc: id },
        {
          arrayOfSpaceIds: this.props.firestore.FieldValue.arrayUnion(this.props.space.id),
          arrayOfSpaceNames: this.props.firestore.FieldValue.arrayUnion(this.state.spaceName)
        }
      );
    });
  };

  removeSpaceFromUsers = () => {
    this.props.space.arrayOfUserIdsInSpace
      .filter(id => this.state.idsInSpace.indexOf(id) === -1)
      .map(id => {
        return this.props.firestore.update(
          { collection: 'users', doc: id },
          {
            arrayOfSpaceIds: this.props.firestore.FieldValue.arrayRemove(this.props.space.id),
            arrayOfSpaceNames: this.props.firestore.FieldValue.arrayRemove(this.state.spaceName)
          }
        );
      });
  };

  setIdsToState = (e, data) => {
    e.preventDefault();
    const { value } = data;
    this.setState({ idsInSpace: value });
  };

  render() {
    const userIdsOptions = this.props.listOfUsersWithinTheOrg
      .filter(user => user.id !== this.props.uuid)
      .map(user => ({
        key: user.id,
        text: user.fullName,
        value: user.id
      }));

    return (
      <Modal open={this.props.shoudlBeOpen} size="tiny">
        <StyledContainer>
          <Modal.Header>
            <div>
              <StyledMainHeader>Edit {this.props.space.spaceName}</StyledMainHeader>
            </div>
            <div>
              <Header as="h5">Space name</Header>
              <StyledInput
                name="spaceName"
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
                defaultValue={this.state.idsInSpace}
                options={userIdsOptions}
                onChange={this.setIdsToState}
              />
              <Modal.Actions>
                <StyledActions>
                  <StyledButtonCancel
                    onClick={() => {
                      this.handleClose();
                      this.props.showModal(null);
                    }}>
                    Cancel
                  </StyledButtonCancel>

                  <StyledButtonCreateSpace
                    type="submit"
                    disabled={!this.state.spaceName.length > 0 || !this.state.idsInSpace.length > 0}
                    onClick={e => {
                      e.preventDefault();
                      this.props.showModal(null);
                      this.updateSpaceToDatabase();
                      this.addSpaceToUsers();
                      this.removeSpaceFromUsers();
                      this.handleClose();
                    }}>
                    Edit Space
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

//Export component wrapped in redux actions and store and firestore
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    activeModal: state.modal.activeModal,
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
)(EditSpaceModal);

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
